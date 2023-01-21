import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, AppRegistry, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, ActivityIndicator, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../env';
import { useIsFocused } from '@react-navigation/native';
import Video, { DRMType } from 'react-native-video';
import { navigate } from "../RootNavigator";
import LinearGradient from 'react-native-linear-gradient';
// import { FlatList } from "react-native-bidirectional-infinite-scroll";






export default Trending = (props) => {

    const [trendingData, setTrendingData] = useState([])
    const [playable, setPlayable] = useState(0)
    const [playable2, setPlayable2] = useState(0)
    const [page, setPage] = useState(1)
    const navigation = props.navigation
    const [refresing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [caughtUp, setCaughtUp] = useState(false)
    const [query, setQuery] = useState('')
    var flatListRef = useRef(null)

    const fetchTrending = async (page, query) => {
        console.log('fetching trending with', page, query)

        setLoading(true)

        var user_id = await AsyncStorage.getItem('user_id')

        if (user_id == null) {

            // this part is not tested
            props.navigation.navigate('Phone')
        }
        else {
            if (!caughtUp) {
                var feedData = await fetch(BASE_URL + `trending/get_feed?user_id=${user_id}&page=${page}&query=${query}`, { method: 'GET' })
                var feedDataJson = await feedData.json()
                setTrendingData(feedDataJson.response)
                setCaughtUp(feedDataJson.caughtup)

                console.log('list length', feedDataJson.response.length)
            }
        }

        setLoading(false)

    }

    useEffect(() => {

        fetchTrending(1, query)

    }, [])

    const SearchBar = () => {
        const [textVal, setTextVal] = useState('')

        const SearchButtonIcon = () => {
            if (textVal.length == 0) {
                return (
                    <>
                        <Image source={{ uri: "https://img.icons8.com/ios/50/null/search--v1.png" }} style={{ height: 20, width: 20, marginBottom: 15 }} />
                    </>
                )
            }
            else {
                return (
                    <>
                        <Image source={{ uri: "https://img.icons8.com/3d-fluency/94/null/search.png" }} style={{ height: 20, width: 20, marginBottom: 15 }} />
                    </>
                )
            }
        }

        return (<>

            <View style={{
                height: 'auto',
                width: '100%',
                flexDirection: 'row',
                paddingTop: 5,
                marginLeft: 20
            }}>
                <TextInput
                    onChangeText={(text) => { console.log(text); setTextVal(text) }}
                    value={textVal}
                    placeholder={'Search your reel ! '}
                    style={{
                        width: '60%',
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                    }}
                >
                </TextInput>
                <TouchableOpacity style={{
                    height: 40,
                    width: 40,
                    paddingTop: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                    marginTop: 10,
                    borderRadius: 50,
                    borderWidth: 0.5,
                    borderColor: 'lightgrey',
                }}
                    onPress={() => {
                        setPage(1)
                        fetchTrending(1, textVal)
                    }}
                >
                    <SearchButtonIcon />
                </TouchableOpacity>
            </View>

        </>)
    }

    const Header = ({ setQuery }) => {
        return (<>
            <View style={{
                height: 'auto',
                width: '100%',
                paddingHorizontal: 5,
                backgroundColor: 'white'
            }}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                    paddingVertical: 10
                }}>
                    <Image source={{ uri: 'https://lh3.googleusercontent.com/fife/AAbDypAJnJ9cQgLCqf7TwNYBT_p_z64GqHW0GKvKVzl6xn1zulB4Ym1XmlSGrnfUjcKVUKTY2y91vqRM8GkQ6I2RkYF-gQACer5JeNM2KmPMKRGS-UDgp8Sjc6Rw7WiAp4yey4u8jrlmTz8hrZ4cu1s6L8IoINBHy9v7pYFLrAlcrftoBna7QOuRJCAI51yMT_u4iL3oiAKIjOt4SD3sA3BY0f0Z67RD3dcCwkbI_ZUYHaTPwp9om2XLviH7AbwpicwO8R33WCNeqGnWBqHp5Th1T0S3G_QBU9xJ7n2KteCRa8OYhWV_r32tXCXE08oG1b1b7VTiSswhiEmEFobTKiFP6TbyJr81YR8Y3jClFvyxHz_7mHWsETQvN-YI70GX9aw12wsKXwevn0MZYbKPhPt3TZgKquVH5lmESvJN5wcPVo0LC18CWc28ouM98oR-3rI9Z18LS5fEljzk30ARHxcIxrqq24RACAgjg4cJtfYbd02Qs5-TWOdE48KCPv98VWfFu2OjPclK_8rzVwmBq63lvxuFEN7RMkD2Xpw4gYG7uCazPVsVXF1y-VChMi2jzFyM3Ev4SWHFPe_Bc0SZBkvnw8xlRC9RAPzGev0YxlJSDakvB3N5Aqf5ouZxg5tgcJ1OfWjcCwhYqnizcboQYdtPXoSFNBDp8igBu0_FFbAfur0Acy98KAH1brgsMC_EJuW3QStTjiAyAIiZ2GuvAVX3g2KHxqL3cBrTSIFFnNF2ZYmuchOY5GUk5Tje60SHHvoUSFYm0cPh5BnhKMrDJnA1tGQB1eBGFBy0C8mGQHU4ojrhUvY8Iq__qwtfE7fTYdcYzxme_-FqZ-xm9E2rp-O8EgDEfjDnFXSknurGByZLlkzCiLQwKA2gE9v0npebRgPhj_nv13v9Njh7VYpRnxs4kOhWuhxNHGNbQWwgVowRmv0I8xoS-vNxMMC_zeAZrhGnTtekJOfbek3l3ouOP74cn4dfl80buknk3aYXafBQvRI5YLI_X1cKBvzFIqnIFTcAFjZT2gvCMesjeK1Uq-ImdkoXjwZJGTZ_HQBJ4cNvqYx7OgJj6TDnYLP5vZdYWaPRZCkHTxomVOK4PUdLPTVJOy_Mns9VzA1_I_JltYCm8MK0Ne-_YvB5BJT8NZN4tlykBbx9t-I-2QNITaDgCu7kBkQO1vBfAVXlzpjQFjq7g5vJeaxdUACZFGRmo-mtyQroUk-erELu7n-kfFV8aOCzYFOD0y4Zp1a2jBSdqAvhw6xQCviwRkISaOQJl_0pSZnoa7yYUlL6jW80zA_X-jkNTDTKPw6DzHugyAzzZJmZWycHv4ezNxANIbON0r-Jzti2TBEPyGxMWuQstN8nhNHWO7f2WSlzaDeLeCjYXaUEFhz4iaf53HBTgomzQkeKc7SE6dndDu1TDKRbCjMwsQcx2b9-9dUHIFdGH05JzW6lhEusoFa9aadEn8Q14U2VV8wgO7CoiGSLT4bQlzX-LSYQVGR4H5RVVfWumidjetIrsrwQ5SMTDk-wsHm4VDsneLNXNHaa93jCGMTUXCm8eLQIdRUqx4qCGTwbevnDACGr2_6MwIZkTDf6-gitcmg0vQrSZVUZqjjVGsghWBHBJPen9Xa5mfdbEidj8pyF3DZc2Z_YeR_Rsf1PDQOtiaNZ_rq1kc2fBOJ8l0oPsTrIdT8jVfBM528TbsCNkhAZGGa1Kmr-w9B7jmPCJm2nvY5PdcJrVx_S8CXSSh_GfrvWd7q4VqzYynKlQKPQYT3y2PDnnPqiTqz_nyMoattG8XOP4b3az35nIWpKhU-JWSsE0A5x86wCIQMYhIsOBNQVl4DX8EdWfmKVf5EgMy3dVURy9dwgzhm8P4BAzmnVEoWb42esnMSpCNX6Sw2iP0q0tVl4zSs-0bbLilgO4SNjjx1ZsCI2kK4flkhTEXtJjpZJdFI1JHMf2CPArslOqDw8oT-KKyHwrMS5wraA_bP7h07rnUqBzyrOxTOk266iJxcAgCC3Hfgf61MjjBVn8S6GixUejPiA7NEwIjE9yEYhm-W4voc8DnUxgNjl-cbg2rzioLMK1rSEx0HHlZYDwUd8j8cdCK3uaJoCKNtpplu7ef59yD_c_ny_ZRYpTHf0jNrGNfye0w66AzA5UNaTq4wn9__CxXnuEN7Do0vBYI7gWhL8XuCdrR32c6AJjQqEqCLu63wme2wKNhKCGv95a9suvt0n9LDgsHsjY1bwlh5ENmLrFiJ_y99KKeQqv1ProArI558KMjX3StCZ18pLulkcblPAOwwgO_u8yOiAQRuCUf4eTNA79E2i5n8m-ZcP9vycIj7cy_sL3n2oO5aFKmsYpJAC0TnMGdbJaiDMTcFCbO8i0Cv1NTRquKYbkVYoqD2wS1gfYc5hB4350IVmQerH3mNd8bBpjmqobOTrUHVL4nf5hCpL5ST6TemJUVjNyULs9H778QaTnpJy4_KJlMoTjunb6D_11Ip2lVsr3Wx5KyBNT1AtarP4OcPteUUNObvnpavkQr1lqe6KqQsSEkdxthlxDZldddumiGyHVSBt28LsMzOsOWUgQDkxeu7MqUuFg7VopVTeFHSeiLhcmd8NBhL_2buLcgwCxMiZYoSSWRf0cxxg34-MH-cEXOp5_zUvbpkqTGVffUWD5Ds-jlwiWWrm56yxbc6OFRM5ZK4fltxLE1l81H8TE9mRF-ixdT3pi2-fgQzqB92XF-RqAy7DyfJ5-r7Y0iSSkq_GUUK71ymH6m_lkiNFpofjUCjrVeeaTTVhic4AIOR7JXCWpn-70pd8XMYcdlMJncsqldPScjZeFyvrXP_ke8NlQVcaDHqCbHNYGdcMsObtVufVPospqsAl3WgOpksdczbZFG7j59P2YzKRTS6FiwoPSROkmb_fGYkWCt7TMpDo0t7HuWRiiWYgfWlfaNCj5gqNesfhCTJuqa0ncJybwu-qJ9-7TpTVkUaMehwGZv_3J3CeVUXbeY36wUUIK5LPyzE4JlrrTYfX6d7w5kyYdsvPIcUYA0YhgTIQacaj6ecYcx7efBEv8vEmUpbppF9YSl8wrnC_emWPPdrlDY-9Tyivi_edqlti1tTJO8grqa6lBuKuOF0xDzlW6lA2ygtJexC5P-ooo3BFoo9-lvkLmAaLKJ-tX8cOZKcTfG04sXAUs91r8I45vnETLVgVE2bD9MnIvT9HbciJaAkbwouhZyDV0vjnKgdjqLar4bLtJNL-39lilSYfBzBGHrbTh1XtVp59Q9wwCzV-MtHAIldzhuweTaeFQXvah81ggxBMS0Q3Tu6FD7D5fiDzBLZkGOhQ2GktNoCIkjJcP6ZD6jAGpoOBlEcGb9DI-UQEuEoT4w1UkdBoio4cELeu7rEfdpsE2t52SjgCGYSiRktjzJ0_woY2Z57-lUn9BEKmulCkzE_nkmqW4PANUR_BmaQ-OowL7lSXyQ1r-kn2TB7FwUSANynILJ5ZS8iRJ4wazulTchPPp_5a34IgALFUa3C6R-o1Apdbnzv2GrpL8nO-1lu8OoGksuYUHscNceKqH4Yi6ZVQETvk2ZmrjM_sVmrxeWX1O-dFzmYcNVcwopLaAt2O9P5oDZIgwDlIvXcRlaUYOT4cxpjhoa8Mos0N_EKETWMxS8rXQDCqVXM_c3WJOw84OQ79XhXMDCgE-yO5o6v4mOHPnMzK0kaSb-CWIpDn8H3qHYdjcDJ-hqlZzuR_66W1BjvCUtkwjdAGJO2nDxOJQi9KwuKMXuP3rQ2nU_L_NxYBZvrc3Nm7zW4Yk1q0OOo9SEh-I5B_-C7mxymiEJ24ZsW3bPdI5i325zEOmj5iuw4QXQtWg8skT_kMTlC5heC7TVgupvV1DmtuOC4FAJhIMFfZLLURJa-SU3fTuhOeZFRSq322B4hzcBUc3qANxSDQyHesxcvpRCTW0-SeoOLpCBF4UAILpS_GVcDGyStR_O3mt8_81XtiqV5q601zWtUiLHs2KnSqybg2dWPx_qjoSP-S2bgcT_E2Eu-9Bgiu_YwoAf1UQ9CNSau_Lz19RrPjl7ZAcXvrNGAgcsLAVIC4pmcuUjO7494LeeEJW6r5S_H8zTB6_CPFdUs6oGGqWrLVwyOhLj1_jeHjmWJ2BwVtK8ErrmL8KY8B4IufXlRKyoL6TJaSOIGPX_ZTOOv_m2dWJB6v7KuddSXy1L4WIdVgTwzyl3BiOy9JVcu0cOY3bQ8E0LCyzz3rOh61HcqA2srBOTEHIzYGyaQITiSRTUNmLaFe_VlZB2rtWRSrNhaDsfDbHtVw19fPQzt_4VNCKeYCWkVFrwBXIMwimT9S_QuFTEn0SDN4qDrXyTOhc4jfiDqJASnSDMt7oqrSx7xrsoJiTnJ7RKQTmOfumJEueSPAdZrLws5uTrqZshK07ZXJ47TrUOQLC8RczY-0lepBLMQmBtInfHVs_ai2ajrfd4KAx3-xhLj1JIW0mRQ8wNq9Pyh98gZOUZJqJGkvLXFeH-GXmHxgmDTMaw9G8Jtnk6EnSLYXvPIzkfbYOlTAOVATeQZqzVw1baJoLR8xe2-DfKDiRvlznU2WOoJtZXKLTwhUQcPyi-PQy7RgJG7cR2JgXYm-sjZdvdg7UT_8Mc_QtvLYlPfizkqFG2HaHshqNx2TyUZ_oTIetZ7cZPs1ICkuo-sXcBcztQ7we8dV6ZAXT5dbBAjdEdo6W4cGaZZrIa2WEi53paZYoUptkqcOGQMiCoEDX8UaNTuSLAtCnhGcaC5PNkaXKkzBFG1v2ECFyNar8XHrqK8C8W5q-BwKqhcXGn_0PiDXGE6EE04jp8_S2mpdycnkvIctzooe2-BA5iZjFsKmdhuHApYfeCHquBpmNNTy8XSTad9Hz-uzic5rilaAEIp5BOCrgR6ow3GB8R1bXvLTTt1nVIFZoSMcq_2hXAki8guzNHlRJvQndHYZkSbft2l3A-_cS1Kjo6TP5QkHs82SJyAOLssHwnGzDbu0Rsn37Uu9LDpy5g-wDLZav8V2OXIWRZ_51Yt3Q91JoYE2kOzkTaOh6o7emRiTNIf_N5ePSR3Y6YnAeIhAesweCOeWlS8EMJz4VHpQ4s-_aFoVgyxaM8L3AKt6K8yttfWuhsHU3WbKJ_dfW17CnOSjXqR1F7w5t8St7RwFigZSgpemciorDmdZ4r0a_t_1ZLv_0wZGlyruc9gmCZDvS9_5rmkxKj01bdTS2tXq_w6XlnRM-VaCRPN9ifBbI8eAoZTh9O-VBbBNWK6tZO9iHPg2X3q8Vor14T4gtjnRGvOG1hGGt1xyGS5J51qvRGRxBXJtF5iTQCmIP8sCvHqNO-iE8LrzPPRRRS9--OowjKFx6-5LjYeKgcLcz4HKAByWit_J0rRzvphyLbOhPzCKbPqFKYM_M4dsT7-tVAiN6X835BgYZup-43DoJ6SNJ2xi51wolUzVUdyV_2rWk346O57b_wtyKu0F8Yvfshcsw5148gVvtPgcDDhUizLGyNV2QoEKCDXAAMDbcLV0DY7ohMr87gA4nVG3NGL3lUuEy5ZOhfV0ntnRQkDe3NLq6guIlqMz3qD4l7HhuHCkni67P9URDYUh-LgbrM5qWtpWuaNCqH2sAbH4E5S0_J708p0hHmXWgbXsLNIkX_fRdrC9A4R0fNtv0e2X3OEqmIAO8qYMf1dkxSUrVV8LisFxFdqtR8LZz0tSgWi18hq77IogLnFi0aPhQSsTrzucA1VbrLi4ebUwIwB3IzXppo8nB1D1094diEbFB4sBYeW1SCMmPAJmvYTVineK9tMEnx7atiKBvaCrhPYJ7BdPUKXS2g4IekD4UG8tp9YQn93qEHfcbegEli9Tg7UaGtXHxpL7YLCulPD8Shx4RjH-7XO2O2hRodhP7gw3Dsd4L7qVhfj6-7nj-fFT8_iiiilUauQdmqFCpg06mF37cYK0cwqYn6UFW0lfD8yBiEVAGTEqSYpHJ1o6VDNZF2BV1aV8FaOfYmrs1t7gnsD5f7jKpxOCG6zh72Iq0XpSqKdp_XFkayp0hKRLPz114jVHPIUGEDSpQstO6FajEhb5o6BkTtQxH3zz-VAyn8vCfRZl_gvOuMgeMkvwyT_Qa2xFIw63DWHsveedvsazs66JkAvNLVdDn_-z5ylUgWAYthweoa_M7HtGHkPKAEbP2Id4OlsgHkboSE0TSeuYy2T7f6heJHpzFYGn2OpnyJ6beJaVcbNoMKgUemB_BfnsdkjGGY56ZBcEnbdUhxV5SJh6yvEvWLtCl01ZAcPpPdfYr96L6InU31Hudl6JPiGRSajqZ97VGkVivavkNCVdpA_DXTUcOFwKwV7YtgS8QHbwVeTw6qCODQoUTw82KV_qXP60KsaAqoty7rC4I0HNP1wgyh6l1L0q46vIE1z7MeMdFAW86EOFabgzKPs5cJ4_UauLsJJfcrC0zQDhCO32v8GUX1Psr7DSy-cv8gCOf3EaGUvPJe2IIMeUp9vkcfbSSbSeNAaFCfDKCCEjSdyFuXkCyJJBs67OSwJPDJqzAOTLMHW6-MHCbXgkbzPgk1JPXY_qjiYh9pP1Y8C1kQpOgJ84Ys-fmb_Y6uBD-yabcHjop4pkJK4o2i5jpjnj8ww7ABrX0xSR20N7ay_hg6_s0gwUDnXshSD6wh02RiYUw-Ec9YZcVHSpCPVUUL2eKxSy6P2dhmp34udhyegvGAXs6gfL4n9VmSRVq5_r2Sg96MqBHyA_ERKtv2hPRefusq2HkRdwKQsbF6uWFsssACeuNz4cERBn_u66tTlPkxAf_jq6G9abCxNce8udBTxb2-u1diMPZPibiEHjtZLxCWfjGFLVXUtX-jj6yezQ7zh4rzBLBuV8zTCnv7U3n3jtYD_pSfLmVfFb8gxe3U9_2cNa5OeeOynb1tH22GyTbitwHhASfCTJp_xvvmC1RU7tmLO2V2CREOlEsnPR2r3po0XTx9Jasg1dc4RRrqXk7LX6udDE6pVSbdgPlSOrRlwxXOFQTPrqVSjq5JAMlNmj3ai4GArYwasPbJNzHC7UOqptRzDDA_CS8YCdRGOYGyz5VAFR0hOVae47JZMyPMdVHMe_LIOvQWdP7mLEPPH0ZyOSRIiVS0B6OYsMimeU1W111jBhEKWrXnIuAtzSwvY1ewt7TwD3YtxS5pVdjouDitxdRasG493KMV-iBUXOMIvwDXc0KVSJRAfe_9Bvxb3Czf0SjmmcZAv9GIN5jZlEjWtgVgHemE8_C9Ka53quDvgMMPUyRf2s0Wkv8aCLKLtihQcrQrydI816iCoMuCCpZNqtV6lw0TGTneWvouCTVfdWtdo80N2yZCdWWy-B7WnEqOWZuwshYH60QrkYlA0IzW1GhvdvZeI1egZKykjPgRDkjM25-Br5ZLVIh7X3yXAmdOr6Ov3qhN0uNq3FcmNY2AeJMDfW-l5WhXRXvDDzBglOBqSJAUwCL5E64mzmUuhS70Hg9pFZaQ4Yk70F6ehL6a9-mtnNCS5HJ4Z4GOCx1MFVzkEywH0c9H0Br9VkMLKL-BF_xFZVPa7XXFGFJciE6-XnPRujwnP-PIsnWPlBisnCckIKRdwLdJonuh8sc6Wtu4QpCXLnhM-ca5IPLAU5XTD9Kj6fLPs5eItpwzkSJhrSfPBOQwAKGsXqOLYIOOUCpkICYiOSx9tJ-iqNpZKPyOu8yi_VrZuWXY0M0eEZ_X1MUWWvZI5f-THpZd6YZTuvGn0vODGlUA8nNyMt1BxzQyFKxaZgIoaQJ6NzXJA9zDfGIFg0toJHNFSnGu890idW-g-tSD67tY68eZccviuRKkCCDsUiZbhTr2EIuYKYyW8bYdJ52wf8e41nNcdENfa6IrPAdsU210ktW2IRwtZ4Rrj_dYWY2x-0PHoapb8Xy2brt1TQZgawCLe3L_6Xb2NU6NO6cGXqNL3yVfGk5yh63nObETkl6vpA2jJ6sEmCeiHCNa41hoT-_2Bv9SD8iOhcbNTMbqn0rvVP85QYgbClDOwLv30fjTtLZCt7J4TS_kBcz_Kx71XA829F8gQgmpSnHhXVhP4nuelnroKHq4JOx9lVc1nRETPvwuk_Ry9ydlQm7ud1T-Eo4oJAXgOX3jFUBe9AhUzdSfyU5sBpluwwpo6EkEVkS8ivv9SvQw__wFsQbqe4mzIA4bhbd4IAj12Orh1MTtCFNhvzseHylQI2C4Ow1CWR5BT19D20zBZC0pZfUF5CSnisKNSpR-3XuqSTq7JyR-7RbBKbfhRCoxdyXEWwL04CCVsNQBc0Rd32OpWkzTkdfIvWVSnOwsHgtyMrsJ3PVNcg8WyebZEgdZvRZ8BP4JNZxESv96js04UGeAiiv4M71SM0aPYFpO3qFAj7GYWlrdYgyoqpoVeiyoY77TNHg0s7orIugmP8ybW1XrqbvQLBaC6vCjq48PpnsfQvu-vTumptEitt20igW06I1okjijv3CBKUx6P1XgIrxcuVnMEhf7iObKAPvqVX1vL1qstSBXJEhnvBicjrlaX1PwAM4tc3SLFzM_6HZPsnyju3YdzCNldv3BWrCBmA2UoWN3_5ngyjbkmzC__XUDEke9xgrvQfc6UjOQ_3duHhcjzf3xBG9-D2_5PkJJjMi_UnxrjaMD8wcdc7wzJmTNTDTDerTlbXRO8gNifwO1yMHnHpLoVgC3O-rDAJKImwm6AS4yo6sBF3jz3MkAn4InKTazCzSa9nBPEglkaMrUCepSYrtVj86MEk7KmgEjS1mu3qx7tLV4BrhhEtAIM0hwrFAVPpqpTQEEnTTGOEZebauwIVc_nvqPdaaXOVC24FukBt96KJVK7QgJsVeOi4pXFCgg-e63M8PXOsPQvi8-XgRKqbpAC5NRIpUnUSva_Li1TxowWkp3S__M2A7v1ORLlQJNVDeJjWYlWHSFGM5Y7350TXSWgvjmwtHFXeYjEZX9sm06H4mK-Lt-5-4IZNNowR3nGZ9VyaK795ncLQaRnq-Py6J3Fz55TxFDrlKe0E5R1NEAJfxYz2EdkIDKzrZqLAoqi31H0zT3Ptk-sTwJCaljwlCprmjWx0WXGxCRqmxfpgo8v7qC9RDKBFzSYixUH0EVcQC5XeKC_Kn-tWbzSVL5nLZmwt73gvvBYKWEywbhMpOkBA0BO-EVxzBJl9ZrVhtG-YxXKxtT3QRZgayvcmrS0ybbP3i_h4bC27mIpPDHD0PncyvjNYj2B9jjQlPTNwD27bALnlhtrZQe202WWdnRE8bi42Fog9rG2ecjtFn34DiH00cc0wvn14QUBTPkVIQSkHnL6nbycvz1dKwUlJuFHy54_bO_kbL5asJQ0rAyuivVb2JErurZa1cNpuyZUu_k4ffMqKmD2HZlHUBiiPXhtJd5-LufS83TPKbS-mLukf_H4szMOJ0IcmIslVcYC_RtvGvaKpUHT_1PxojdXGiv40KK6hj8q0MHzze6c82GyxwYyanxYWyR2SOtzt8CTAe7gCaGFykHhhH_RG8c5uCh6EbZU25lcD3g3qEIOHRZpFuCcoiZM76pRwwk0PIBiwi_fTMH8zvVypdR6MFUgsxHkjY8jqaW_FxMIhOjHGIUbJT8I2zu1m7wz1QDHSq1DPByqMzGOXlHBXUdBQJcuDfCWm1RrWbtfytf56ZpB2O6Au2edoiE_OrB_z_1oc1PddV-cmWPWJjPaaUir5mtxzsa24UzY3pzVg_Oaz68-hqgiLKBugJBQuXlpcZyixpoqcPFOqQRgxtow90CE02Z4UMFreQQYYs0LO1XFJvzTBb63kzBIdsXo5cmaprWCPZvdj1oHhTD63BuFx6RDCUUJqkHCx5hSX-T-afjfKkkN-wuyV0n4izq-4-otGHqF0pI4Tr0_lokkQoLk1pjxp52Mkd-mZN1Gw31qwhAqvPPW87Z9DKDThXyBoN5tXUhwkBqca6zV_d_D7aGyrHJxsXZs1yJdCN3cnskvqF74LqCTdMhawSnsYadxnSpu4--TZnW2CmPUrusjd60hm7vcgQVSX34UdlKm8cc6dZvV9VJwFZ_zVRb848z7VSLcE9cZfetkjH-dkwZUSrM7g-R3-JkZZOcHUlkzOeIBYcS79ezL60xKAISPXyY3ePzMCMARexk-C_nJ72RIOZqf5qjm6kkKSrDE0M-ub-SKt0luUazRLGKMq-PHdVM0SGkTrgG9hgtt3X2kp3ZGFtxHqVoMuJZSitmXTQmL5IZVn-kc-XQlogFlQjjUDXyhcVByoEycon7_zT0UAhCX1C2nq64LpGjsY6oYkkpuEXfDk4YDaLtkVYr52yRnbkuGwUeilc8gfj2j0AtiSpsDvz5Hqwn70zc8Y9KhPwWneJLUtH87XSjm1t1Kkp4mxbVGbe15GXWgm3PgtY-87YGN8FOzp8icxLCx5tZjHaP8F=s286-w280-h286-no?authuser=0' }} style={{
                        height: 55,
                        width: 55,
                    }} />
                    {/* <View style={{
                        marginLeft: 5
                    }}> */}
                    {/* <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'green'
                        }}>BuyBold</Text> */}
                    {/* <Text style={{
                            fontSize: 15,
                            color: 'darkgreen',
                            fontStyle: 'italic'
                        }}>Look Before You Buy</Text> */}
                    {/* </View> */}
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        flexDirection: 'row',
                    }}>
                        <SearchBar />
                    </View>
                </View>

            </View>
        </>)
    }

    const onRefresh = async () => {
        console.log('refresh !')
        setRefreshing(true)
        var new_page = Math.max(1, page - 1)
        await fetchTrending(new_page, query)
        setPage(new_page)
        setRefreshing(false)
    }

    const onEndReached = async () => {
        setLoading(true)
        await fetchTrending(page + 1, query)
        setPage(page + 1)
        // flatListRef.scrollToOffset({ animated: true, offset: 0 });
    }

    const onViewCallBack = React.useCallback((viewableItems) => {

        var changed = viewableItems.changed

        for (var i = 0; i < changed.length; i++) {
            if (changed[i].isViewable == true) {

                if (i == 0) {
                    setPlayable(changed[i].index)
                }
                else {
                    break
                }

            }
        }

        // Use viewable items in state or as intended
    }, []) // any dependencies that require the function to be "redeclared"


    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 })



    const FlatListHorizontalItem = ({ index, item }) => {
        const OpenSpecificView = () => {
            navigate("ProductSpecific", { item, navigation });
        };

        return (

            <TouchableOpacity onPress={OpenSpecificView}>
                <LinearGradient style={{
                    height: 'auto',
                    width: 200,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // borderRightColor: 'lightgrey',
                    // borderRightWidth: 0.5,
                    backgroundColor: 'white',
                    marginLeft: 5,
                    borderRadius: 20,
                    shadowColor: "#3a748a",
                    elevation: 10,
                    overflow: 'hidden',
                }} colors={['white', 'aliceblue']}>

                    <View style={{
                        height: 150,
                        width: 150,
                        borderRadius: 80,
                        backgroundColor: '#A4EBF3',
                        left: -75,
                        bottom: -75,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View>
                    <View style={{
                        height: 150,
                        width: 150,
                        borderRadius: 80,
                        backgroundColor: '#A4EBF3',
                        right: -75,
                        top: -75,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View>

                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <View style={{
                            width: 90,
                            marginLeft: 5,
                        }}>
                            <Image source={{ uri: item.image }} style={{ height: 80, width: 80, borderRadius: 20 }} />
                        </View>

                        <View style={{
                            width: '50%',
                            justifyContent: 'center',
                        }}>

                            <Text style={styles.titleStyle}>{item.name}</Text>
                        </View>

                    </View>

                    <View>
                        <Text style={{
                            fontSize: 15,
                            color: 'grey'
                        }}>
                            Now at only
                        </Text>
                        <Text style={{
                            fontSize: 25,
                            color: 'black'
                        }}>{item.price} /-</Text>
                    </View>

                </LinearGradient>
            </TouchableOpacity>
        )
    }


    const FlatListItem = ({ index, item }) => {

        var playVid = true

        if (index == playable) {
            playVid = true
        }
        else {
            playVid = false
        }

        const VidRendrable = () => {

            if (playVid) {
                return <>
                    <Video key={index}
                        source={{ uri: item.videoUrl }}
                        rate={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay
                        repeat
                        poster={item.posterimage}
                        style={styles.videoContainer}
                        paused={!playVid}
                    />
                </>
            }
            else {
                return <>
                    <Image source={{ uri: item.holdimage }} style={styles.videoContainer} />
                </>
            }
        }

        return (
            <>
                <LinearGradient style={{
                    height: 'auto',
                    width: '100%',
                    paddingVertical: 20,
                    borderColorBottom: 'lightgrey',
                    borderBottomWidth: 0.2,
                    alignItems: 'center',
                    overflow: 'hidden',
                }} colors={['white', 'white']}>

                    <View style={{
                        height: 100,
                        width: 100,
                        borderRadius: 80,
                        backgroundColor: 'aliceblue',
                        left: -50,
                        top: -50,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View>

                    <View style={{
                        height: 150,
                        width: 150,
                        borderRadius: 150,
                        backgroundColor: 'aliceblue',
                        right: -75,
                        bottom: -75,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View>

                    <View style={styles.textContainer}>
                        <Text style={styles.titleMainStyle}>{item.title}</Text>
                        <Text style={styles.descr1Style}>{item.description1}</Text>
                    </View>

                    <VidRendrable />

                    <View style={styles.textContainer}>
                        <Text style={styles.titleStyle}>Buy From Here</Text>
                    </View>

                    <FlatList
                        horizontal
                        data={item.products}
                        renderItem={FlatListHorizontalItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={{
                            height: 150,
                            width: '100%',
                            marginVertical: 5,
                            marginLeft: 5,
                        }}
                    />

                </LinearGradient>

            </>

        )
    }

    const EndReachedComponent = () => {

        if (caughtUp) {
            return (<>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20
                }}>
                    <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/null/today.png' }} style={{ height: 100, width: 100 }} />
                    <Text style={{
                        color: 'black',
                        fontSize: 25,
                    }}>You are all caught up !</Text>
                </View>
            </>)
        }
        else {
            if (loading) {
                return (<>
                    <ActivityIndicator size={'small'} color={'green'} />
                </>)
            }
        }

    }


    return (<>
        <SafeAreaView>
            <Header setQuery={setQuery} />
            <FlatList
                data={trendingData}
                ref={(ref) => { flatListRef = ref }}
                renderItem={FlatListItem}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={onViewCallBack}
                viewabilityConfig={viewConfigRef.current}
                ListFooterComponent={<>
                    <EndReachedComponent />
                </>}
                onStartReached={onRefresh}
                onEndReached={onEndReached}

                // external
                showDefaultLoadingIndicators={true} // optional
                onStartReachedThreshold={10} // optional
                onEndReachedThreshold={0.5} // optional
                activityIndicatorColor={'black'} // optional
                HeaderLoadingIndicator={() => { /** Your loading indicator */ }} // optional
                FooterLoadingIndicator={() => { /** Your loading indicator */ }} // optional
                enableAutoscrollToTop={true} // optional | default - false
                style={{
                    backgroundColor: 'white',
                }}
            />
        </SafeAreaView>
    </>)


}

const styles = StyleSheet.create({
    videoContainer: {
        height: 300,
        width: '100%',
        backgroundColor: 'lightgrey',
        paddingVertical: 5,
    },
    textContainer: {
        height: 'auto',
        width: '100%',
        marginTop: 10,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    titleMainStyle: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        marginLeft: 0,
    },
    titleStyle: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        marginLeft: 0,
    },
    descr1Style: {
        fontSize: 15,
        color: 'black',
    },
    descr2Style: {
        fontSize: 12,
        color: 'grey'
    }

})

