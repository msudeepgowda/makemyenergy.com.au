import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button,
    Container, Grid, GridItem, HStack, Input, Image, VStack, Radio, RadioGroup, Alert, AlertIcon,
    Slider, SliderTrack, SliderFilledTrack, useToast, SliderThumb, SliderMark
} from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import Navbar from '../components/navbar'
import { useRouter } from 'next/router';
import TopFooter from '../components/topfooter';

export default function Design() {

    const [summary, setSummary] = useState({ panel: "", inverter: "", battery: "", bcharger: "", optimizer: "", charger: "" });
    const [summaryExtra, setSummaryExtra] = useState({});
    const [totalSummaryPrice, setTotalSummaryPrice] = useState({ price: 0, inverter: 0, battery: 0, bcharger: 0, optimizer: 0, charger: 0, extra: 0 })
    const [bill, setBill] = useState(350)
    const [panelAndInverterType, setPanelAndInverterType] = useState(1)
    const [allPanelAndInverterType, setAllPanelAndInverterType] = useState([{ panel: "6.6KW", inverter: "5KW" }, { panel: "8KW", inverter: "8+KW" }, { panel: "9.5KW", inverter: "8+KW" }])

    const [panelImages, setPanelImages] = useState([])
    const [panelData, setPanelData] = useState([])
    const [panelHidden, setPanelHidden] = useState("hidden")

    const [inverterImages, setInverterImages] = useState([])
    const [inverterData, setInverterData] = useState([])
    const [inverterHidden, setInverterHidden] = useState("hidden")

    const [hybrid_inverterImages, setHybrid_inverterImages] = useState([])
    const [hybrid_inverterHidden, setHybrid_inverterHidden] = useState("hidden")

    const [bchargerImages, setBchargerImages] = useState([])
    const [bchargerData, setBchargerData] = useState([])
    const [bchargerHidden, setBchargerHidden] = useState("hidden")

    const [optimizerImages, setOptimizerImages] = useState([])
    const [optimizerData, setOptimizerData] = useState([])
    const [optimizerHidden, setOptimizerHidden] = useState("hidden")
    const [showOptimizer, setShowOptimizer] = useState("no")
    const [numberOfOptimizers, setNumberOfOptimizers] = useState(1)

    const [batteryImages, setBatteryImages] = useState([])
    const [batteryData, setBatteryData] = useState([])
    const [batteryHidden, setBatteryHidden] = useState("hidden")
    const [selectedBattery, setSelectedBattery] = useState({})
    const [wantBattery, setWantBattery] = useState("")

    const [showEVcharger, setShowEVcharger] = useState("no")
    const [additionalType, setAdditionalType] = useState("hybrid")
    const [propertyType, setPropertyType] = useState("res")

    const [discounts, setDiscounts] = useState({ panel_rebate: 0, battery_rebate: 0, rebate_type: "none", stc: 0 })

    const { register, handleSubmit, watch, formState: { errors }, ...formMethods } = useForm();
    const router = useRouter();
    const toast = useToast();
    const { stateData } = router.query || "no value";

    const formData = watch();
    const floorData = watch('floors')

    function changeWantBattery(val) {
        setWantBattery(val)
        if (val == "hidden") {
            removeFromSummary("battery");
        }
    }

    function ChangeOptimizerShowValue(val) {
        setShowOptimizer(val)
        if (val == "no") {
            removeFromSummary("optimizer")
        }
    }

    function ChangeAdditionalProductType(val) {
        setAdditionalType(val)
        if (val == "charger") {
            handleAddNewBill("1200", "charger")
        } else {
            removeFromSummary("charger");
            setInverterHidden("hidden")
        }
    }

    function setPanelAndInverter() {
        if (bill < 600) {
            setPanelAndInverterType(1)
        } else if (bill < 750) {
            setPanelAndInverterType(2)
        }
        else {
            setPanelAndInverterType(3)
        }
        removeFromSummary("all");
    }

    function setPanelAndInverterRecommended(val) {
        console.log(val);
        if (val == 0) {
            setPanelAndInverterType(1)
        } else if (val == 1) {
            setPanelAndInverterType(2)
        }
        else if (val == 2) {
            setPanelAndInverterType(3)
        }
        removeFromSummary("all");
    }

    function getPanels(val) {
        axios.get(`/route/productByBrand/panel/${val}`)
            .then((res) => {
                setPanelData(res.data)
                handleAddNewBill(res.data[0], "panel")
            })
            .catch(err => console.log("error"))

        setPanelHidden("")
    }

    function getInverters(val) {
        axios.get(`/route/productByBrand/inverter/${val}`)
            .then((res) => {
                const filteredData = res.data.filter(item => item.size.indexOf(allPanelAndInverterType[panelAndInverterType - 1].inverter) !== -1);

                if (formData.meterType == "Single") {
                    const finalData = filteredData.filter(item => item.model === "single phase")
                    console.log(finalData)
                    setInverterData(finalData)
                    handleAddNewBill(finalData[0], "inverter")
                } else if (formData.meterType == "Two") {
                    const finalData = filteredData.filter(item => item.model === "two phase")
                    console.log(finalData)
                    setInverterData(finalData)
                    handleAddNewBill(finalData[0], "inverter")
                } else if (formData.meterType == "Three") {
                    const finalData = filteredData.filter(item => item.model === "three phase")
                    console.log(finalData)
                    setInverterData(finalData)
                    handleAddNewBill(finalData[0], "inverter")
                } else {
                    const finalData = filteredData.filter(item => item.model !== "hybrid")
                    console.log(finalData)
                    setInverterData(finalData)
                    handleAddNewBill(finalData[0], "inverter")
                }
            })
            .catch(err => {
                setInverterData("empty");
                removeFromSummary("inverter");

            })
        setInverterHidden("");
        setHybrid_inverterHidden("hidden")
    }

    function getHybridInverters(val) {
        axios.get(`/route/productByBrand/hybrid_inverter/${val}`)
            .then((res) => {
                setInverterData(res.data)
                handleAddNewBill(res.data[0], "inverter")
            })
            .catch(err => console.log("error"))

        axios.get(`/route/compatibleBatteryBrandImg/${val}`)
            .then((res) => setBatteryImages(res.data))
            .catch(err => console.log("error"))

        setHybrid_inverterHidden("");
        setInverterHidden("hidden")
    }

    function getBattery(val) {
        axios.get(`/route/productByBrand/battery/${val}`)
            .then((res) => {
                setBatteryData(res.data)
                handleAddNewBill(res.data[0], "battery", "with_eps")
            })
            .catch(err => console.log("error"))
        setBatteryHidden("");
    }

    function getBcharger(val) {
        axios.get(`/route/productByBrand/charger/${val}`)
            .then((res) => {
                setBchargerData(res.data)
                handleAddNewBill(res.data[0], "bcharger")
            })
            .catch(err => console.log("error"))
        setBchargerHidden("");
    }

    function getOptimizer(val) {
        axios.get(`/route/productByBrand/optimizer/${val}`)
            .then((res) => {
                setOptimizerData(res.data)
                handleAddNewBill(res.data[0], "optimizer")
            })
            .catch(err => console.log("error"))
        setOptimizerHidden("");
    }


    function onSubmit(data) {
        // data.bill = bill
        // console.log(data)
        let finalBill = {}
        finalBill.bill = bill
        finalBill.state = "any"
        finalBill.zip = data.pincodes
        finalBill.property_type = propertyType
        finalBill.floor_type = data.floors
        finalBill.roof_type = data.roof
        finalBill.roof_material = data.roofMaterial
        finalBill.meter_type = data.meterType
        finalBill.panel_existance_status = data.existingPanel
        finalBill.inverter_size = summary.inverter.size

        if (summary.charger.hidden == "allow") {
            finalBill.battery_charger_ind = "yes" // Value in Yes or No
        } else {
            finalBill.battery_charger_ind = "no"
        }

        // optimizer
        if (summary.optimizer.hidden == "allow") {
            finalBill.optimizer_brand = summary.optimizer.brand
            finalBill.optimizer_model = summary.optimizer.model
            finalBill.optimizer_price = summary.optimizer.price
        } else {
            finalBill.optimizer_brand = ""
            finalBill.optimizer_brand = ""
            finalBill.optimizer_brand = ""
        }

        // battery
        if (summary.battery.hidden == "allow") {
            finalBill.battery_brand = summary.battery.brand
            finalBill.battery_model = summary.battery.model
            finalBill.battery_epsFlag = summary.battery.size
            finalBill.battery_price = summary.battery.price
        } else {
            finalBill.battery_brand = ""
            finalBill.battery_model = ""
            finalBill.battery_epsFlag = ""
            finalBill.battery_price = ""
        }

        if (summary.charger.hidden == "allow") {
            finalBill.charger_brand = summary.charger.brand
            finalBill.charger_model = summary.charger.model
            finalBill.charger_epsFlag = summary.charger.size
            finalBill.charger_price = summary.charger.price
        } else {
            finalBill.charger_brand = ""
            finalBill.charger_model = ""
            finalBill.charger_epsFlag = ""
            finalBill.charger_price = ""
        }

        if (discounts.rebate_type == "battery_rebate") {
            finalBill.rebate = discounts.battery_rebate
        } else if (discounts.rebate_type == "panel_rebate") {
            finalBill.rebate = discounts.panel_rebate
        }


        finalBill.EV_charger_id = summary.bcharger,
            finalBill.total_price = (totalSummaryPrice.panel + totalSummaryPrice.inverter + totalSummaryPrice.battery + totalSummaryPrice.charger + totalSummaryPrice.bcharger + totalSummaryPrice.optimizer),
            finalBill.orderType = "systemDesign",
            finalBill.user_id = "dfghjjhbv",

            console.log(finalBill)

        if (localStorage.getItem("makemyenergy_Email") == null) {
            localStorage.setItem("route", "/design");
            alert("Please Sign In before submitting Order for Review")
            router.push("/signin")
        } else {
            localStorage.removeItem("route")
            console.log("submitting final")
            axios.post(`/route/submitOrder/${localStorage.getItem("makemyenergy_Email")}`, {

                state: stateData,
                bill: finalBill.bill,
                zip: finalBill.zip,
                property_type: finalBill.property_type,
                floor_type: finalBill.floor_type,
                roof_type: finalBill.roof_type,
                roof_material: finalBill.roof_material,
                meter_type: finalBill.meter_type,
                panel_existance_status: finalBill.panel_existance_status,

                panel_brand: summary.panel.brand,
                panel_model: summary.panel.model,
                panel_size: summary.panel.size,
                panel_number: summary.panel.number_of_panels,
                panel_price: summary.panel.price,

                inverter_brand: summary.inverter.brand,
                inverter_model: summary.inverter.model,
                inverter_size: summary.inverter.size,
                inverter_price: summary.inverter.price,

                battery_brand: finalBill.battery_brand,
                battery_model: finalBill.battery_model,
                battery_epsFlag: finalBill.battery_epsFlag,
                battery_price: finalBill.battery_price,

                additional_prod: finalBill.additional_prod,

                ev_charger_brand: finalBill.ev_charger_brand,
                ev_charger_model: finalBill.ev_charger_model,
                ev_charger_phase: finalBill.meter_type,
                ev_charger_size: finalBill.ev_charger_size,
                ev_charger_price: finalBill.ev_charger_price,

                optimizer_brand: finalBill.optimizer_brand,
                optimizer_model: finalBill.optimizer_model,
                optimizer_price: finalBill.optimizer_price,

                stc: discounts.stc,
                rebate: finalBill.rebate,

                total_price: finalBill.total_price,
                orderType: finalBill.orderType,
                user_id: localStorage.getItem("makemyenergy_Email"),

            },
                {
                    withCredentials: true
                })
                .then(response => {
                    console.log(response)
                    toast({
                        title: 'Congrats! Ordered Submitted',
                        description: "We will get back to you soon.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }).catch(async (error) => {
                    if (error.response.status === 401 && (error.response.data === "Access denied, No Token provided" || error.response.data === "Invalid token")) {
                        await axios.get(`/route/logout`).then((response) => {
                            if (response.data === "Logout Successful" && response.status === 200) {
                                localStorage.removeItem("makemyenergy_Email")
                                alert("Please Sign In before submitting Order for Review")
                                router.push("/signin")
                            }
                        }).catch(error => { console.log(error) })
                    }
                })
        }
    };


    // const onSubmit = data => console.log(data); 


    // function panelRightPrice(val, no_of_panels) {


    //     return price;
    // }

    function updateSTC(model, number_of_panels) {
        console.log(formData.pincodes, model, number_of_panels);
        axios.get(`/route/getSTC/${formData.pincodes}/${model}/${number_of_panels}`)
            .then((res) => {
                console.log(res);
                if (discounts.rebate_type == "none") {
                    setDiscounts({ ...discounts, rebate_type: "panel_rebate", stc: Number(res.data.stc) })
                }
                else {
                    setDiscounts({ ...discounts, stc: Number(res.data.stc) })
                }
            })
            .catch(err => console.log(err))

    }

    function handleAddNewBill(billData, prod, extra) {
        if (prod == "panel") {
            const indexOfPanel = billData.size.indexOf(allPanelAndInverterType[panelAndInverterType - 1].panel)
            if (indexOfPanel == -1) {
                <Alert status='warning'>
                    <AlertIcon />
                    This model does not exist in this brand
                </Alert>
            } else {

                let to_multiply_with = 0;
                let to_add_with = 0;
                let panelCount = Number(billData.no_of_panels[panelAndInverterType])
                if (formData.floors == "multi") {
                    to_add_with = to_add_with + 500;
                }

                if (formData.roof == "flate") {
                    to_multiply_with = to_multiply_with + 50
                }

                if (formData.roofMaterial == "Kilp/Lock") {
                    to_multiply_with = to_multiply_with + 40
                } else if (formData.roofMaterial == "Tile") {
                    to_multiply_with = to_multiply_with + 10
                } else if (formData.roofMaterial == "Concrete") {
                    to_multiply_with = to_multiply_with + 15
                } else if (formData.roofMaterial == "Terracotta") {
                    to_multiply_with = to_multiply_with + 25
                }

                if (formData.meterType == "Single" && (allPanelAndInverterType[panelAndInverterType - 1].panel == "8KW" || allPanelAndInverterType[panelAndInverterType - 1].panel == "9KW")) {
                    to_add_with = to_add_with + 400;
                } else if (formData.meterType == "Three") {
                    to_add_with = to_add_with + 800;
                }

                if (formData.existingPanel == "Yes") {
                    to_add_with = to_add_with + 400;
                }

                const panelAmount = (panelCount * to_multiply_with) + to_add_with
                const totalPanelAmount = Number(panelAmount) + Number(billData.price[panelAndInverterType])
                setTotalSummaryPrice({ ...totalSummaryPrice, panel: totalPanelAmount })
                setSummary({
                    ...summary, panel: {
                        _id: billData._id,
                        brand: billData.brand,
                        model: billData.model,
                        product_desc: billData.product_desc,
                        prod_warranty: billData.prod_warranty,
                        efficiancy_warranty: billData.efficiancy_warranty,
                        size: billData.size[indexOfPanel],
                        price: billData.price[indexOfPanel],
                        number_of_panels: Number(billData.no_of_panels[indexOfPanel]),
                        product_image_url: billData.product_image_url,
                        logo_image_url: billData.logo_image_url,
                        hidden: "allow"
                    }
                })
                setSummaryExtra({
                    ...summaryExtra,
                    brand: "Extra Cost",
                    model: "(Due to type of roof and other reasons)",
                    price: panelAmount,
                    hidden: "allow"
                }
                )

                updateSTC(billData.model, billData.no_of_panels[indexOfPanel]);

            }

        } else if (prod == "inverter") {
            const indexOfPanel = billData.size.indexOf(allPanelAndInverterType[panelAndInverterType - 1].inverter)
            console.log(indexOfPanel)
            if (indexOfPanel == -1) {
                <Alert status='warning'>
                    <AlertIcon />
                    This model does not exist in this brand
                </Alert>
            } else {
                setTotalSummaryPrice({ ...totalSummaryPrice, inverter: Number(billData.price[indexOfPanel]) })
                setSummary({
                    ...summary, inverter: {
                        _id: billData._id,
                        brand: billData.brand,
                        model: billData.model,
                        product_desc: billData.product_desc,
                        prod_warranty: billData.prod_warranty,
                        efficiancy_warranty: billData.efficiancy_warranty,
                        size: billData.size[indexOfPanel],
                        price: billData.price[indexOfPanel],
                        product_image_url: billData.product_image_url,
                        logo_image_url: billData.logo_image_url,
                        hidden: "allow"
                    }
                });
            }
        } else if (prod == "battery") {
            setSelectedBattery(billData)
            if (extra == "with_eps") {
                setTotalSummaryPrice({ ...totalSummaryPrice, battery: Number(billData.with_eps) })
                setSummary({
                    ...summary, battery: {
                        _id: billData._id,
                        brand: billData.brand,
                        model: billData.model,
                        product_desc: billData.product_desc,
                        prod_warranty: billData.prod_warranty,
                        efficiancy_warranty: billData.efficiancy_warranty,
                        size: "With EPS",
                        price: billData.with_eps,
                        product_image_url: billData.product_image_url,
                        logo_image_url: billData.logo_image_url,
                        hidden: "allow"
                    }
                });
            } else if (extra = "without_eps") {
                setTotalSummaryPrice({ ...totalSummaryPrice, battery: Number(billData.without_eps) })
                setSummary({
                    ...summary, battery: {
                        _id: billData._id,
                        brand: billData.brand,
                        model: billData.model,
                        product_desc: billData.product_desc,
                        prod_warranty: billData.prod_warranty,
                        efficiancy_warranty: billData.efficiancy_warranty,
                        size: "Without EPS",
                        price: billData.without_eps,
                        product_image_url: billData.product_image_url,
                        logo_image_url: billData.logo_image_url,
                        hidden: "allow"
                    }
                });
            }
            if (discounts.rebate_type != "battery_rebate") {
                setDiscounts({ ...discounts, rebate_type: "battery_rebate" })
            }
        } else if (prod == "bcharger") {
            setTotalSummaryPrice({ ...totalSummaryPrice, bcharger: Number(billData.price[0]) })
            setSummary({
                ...summary, bcharger: {
                    _id: billData._id,
                    brand: billData.brand,
                    model: billData.model,
                    product_desc: billData.product_desc,
                    prod_warranty: billData.prod_warranty,
                    efficiancy_warranty: billData.efficiancy_warranty,
                    size: billData.size[0],
                    price: billData.price[0],
                    product_image_url: billData.product_image_url,
                    logo_image_url: billData.logo_image_url,
                    hidden: "allow"
                }
            });
        } else if (prod == "optimizer") {
            setTotalSummaryPrice({ ...totalSummaryPrice, optimizer: Number(billData.price[0]) * numberOfOptimizers })
            setSummary({
                ...summary, optimizer: {
                    _id: billData._id,
                    brand: billData.brand,
                    model: billData.model,
                    product_desc: billData.product_desc,
                    prod_warranty: billData.prod_warranty,
                    efficiancy_warranty: billData.efficiancy_warranty,
                    basePrice: Number(billData.price[0]),
                    price: Number(billData.price[0]) * numberOfOptimizers,
                    product_image_url: billData.product_image_url,
                    logo_image_url: billData.logo_image_url,
                    hidden: "allow"
                }
            });
        } else if (prod == "charger") {
            setTotalSummaryPrice({ ...totalSummaryPrice, charger: Number(billData) })
            setSummary({
                ...summary, charger: {
                    _id: "any Id",
                    brand: summary.inverter.brand,
                    model: "charger",
                    product_desc: summary.inverter.product_desc,
                    prod_warranty: summary.inverter.prod_warranty,
                    efficiancy_warranty: summary.inverter.efficiancy_warranty,
                    size: summary.inverter.size,
                    price: billData,
                    product_image_url: summary.inverter.product_image_url,
                    logo_image_url: summary.inverter.logo_image_url,
                    hidden: "allow"
                }
            });
        }
    }

    // function optimizerCountChange(event){
    //     setNumberOfOptimizers(event.target.value);
    //     console.log(formData)
    //     setTotalSummaryPrice({ ...totalSummaryPrice, optimizer: Number(summary.optimizer.price*2) })
    // }
    const handleSelect = (event) => {
        setNumberOfOptimizers(event.target.value);
        const numberOfOptimizersForNow = Number(event.target.value);
        const changesPrice = summary.optimizer.basePrice * numberOfOptimizersForNow;
        setTotalSummaryPrice({ ...totalSummaryPrice, optimizer: changesPrice })
        setSummary({ ...summary, optimizer: { ...summary.optimizer, price: changesPrice } });
    };

    function removeFromSummary(prod) {
        if (prod == "all") {
            setSummary({ ...summary, panel: { ...summary.panel, hidden: "hidden" }, inverter: { ...summary.inverter, hidden: "hidden" }, battery: { ...summary.battery, hidden: "hidden" }, bcharger: { ...summary.bcharger, hidden: "hidden" }, optimizer: { ...summary.optimizer, hidden: "hidden" }, charger: { ...summary.charger, hidden: "hidden" } });
            setPanelHidden("hidden");
            setBatteryHidden("hidden");
            setBchargerHidden("hidden");
            setOptimizerHidden("hidden")
            setHybrid_inverterHidden("hidden")
            setInverterHidden("hidden")
            setTotalSummaryPrice({ ...totalSummaryPrice, panel: 0, inverter: 0, battery: 0, bcharger: 0, charger: 0, optimizer: 0 })
            setDiscounts({ ...discounts, rebate_type: "none", stc: 0 })

        } else if (prod == "panel") {
            setSummary({ ...summary, panel: { ...summary.panel, hidden: "hidden" } });
            setTotalSummaryPrice({ ...totalSummaryPrice, panel: 0 })
            if (discounts.rebate_type == "panel_rebate") {
                setDiscounts({ ...discounts, rebate_type: "none" })
            }
        } else if (prod == "inverter") {
            setSummary({ ...summary, inverter: { ...summary.inverter, hidden: "hidden" } });
            setTotalSummaryPrice({ ...totalSummaryPrice, inverter: 0 })
        } else if (prod == "charger") {
            setSummary({ ...summary, charger: { ...summary.charger, hidden: "hidden" } });
            setTotalSummaryPrice({ ...totalSummaryPrice, charger: 0 })
        } else if (prod == "battery") {
            setSummary({ ...summary, battery: { ...summary.battery, hidden: "hidden" } });
            setBatteryHidden("hidden");
            setTotalSummaryPrice({ ...totalSummaryPrice, battery: 0 })
            if (discounts.rebate_type == "battery_rebate" && (summary.panel.hidden == "hidden" || summary.panel == "")) {
                setDiscounts({ ...discounts, rebate_type: "none" })
            } else if (discounts.rebate_type == "battery_rebate") {
                setDiscounts({ ...discounts, rebate_type: "panel_rebate" })
            }
        } else if (prod == "optimizer") {
            setSummary({ ...summary, optimizer: { ...summary.optimizer, hidden: "hidden" } });
            setOptimizerHidden("hidden")
            setTotalSummaryPrice({ ...totalSummaryPrice, optimizer: 0 })
        } else if (prod == "bcharger") {
            setSummary({ ...summary, bcharger: { ...summary.bcharger, hidden: "hidden" } });
            setBchargerHidden("hidden");
            setTotalSummaryPrice({ ...totalSummaryPrice, bcharger: 0 })
        }
    }

    function ChangeEVchargerValue(val) {
        if (val == "no") {
            removeFromSummary("bcharger")
        }
        setShowEVcharger(val)
    }


    function setBillValues(val) {
        setBill(val);
    }

    function changeThePropertyType(val) {
        setPropertyType(val);
    }


    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    // function updateExtraBill() {

    //     if (summary.panel != "" || summary.panel.hidden == "allow") {
    //         console.log(floorData)
    //         let to_multiply_with = 0;
    //         let to_add_with = 0;
    //         let panelCount = Number(summary.panel.number_of_panels)
    //         if (formData.floors == "multi") {
    //             to_add_with = to_add_with + 500;
    //         }

    //         if (formData.roof == "flate") {
    //             to_multiply_with = to_multiply_with + 50
    //         }

    //         if (formData.roofMaterial == "Kilp/Lock") {
    //             to_multiply_with = to_multiply_with + 40
    //         } else if (formData.roofMaterial == "Tile") {
    //             to_multiply_with = to_multiply_with + 10
    //         } else if (formData.roofMaterial == "Concrete") {
    //             to_multiply_with = to_multiply_with + 15
    //         } else if (formData.roofMaterial == "Terracotta") {
    //             to_multiply_with = to_multiply_with + 25
    //         }

    //         if (formData.meterType == "Single" && (allPanelAndInverterType[panelAndInverterType - 1].panel=="8KW" || allPanelAndInverterType[panelAndInverterType - 1].panel=="9KW")) {
    //             to_add_with = to_add_with + 400;
    //         } else if (formData.meterType == "Three") {
    //             to_add_with = to_add_with + 800;
    //         }

    //         if (formData.existingPanel == "Yes") {
    //             to_add_with = to_add_with + 400;
    //         }

    //         const extraPrice = (panelCount * to_multiply_with) + to_add_with
    //         setSummaryExtra({
    //             ...summaryExtra,
    //                 brand: "Extra Cost",
    //                 model: "(Due to type of roof and other reasons)",
    //                 price: extraPrice,
    //                 hidden: "allow"
    //             })
    //         setTotalSummaryPrice({ ...totalSummaryPrice, extra: extraPrice })
    //     } else if (summary.panel.hidden == "hidden" || summary.panel == "") {

    //         setSummary({ ...summary, extra: { ...summary.extra, hidden: "hidden" } });
    //         setSummaryExtra({
    //             ...summaryExtra,
    //             hidden: "hidden"
    //             })
    //         setTotalSummaryPrice({ ...totalSummaryPrice, extra: 0 })
    //     }
    // }

    const validatePinCode = (value) => {
        const regex = /^\d{4}$/; // regular expression to match 4-digit pincode
        return regex.test(value) || "Pincode should be a 4-digit number"; // return error message if validation fails
    };

    useEffect(() => {
        axios.get('/route/productBrandImg/panel')
            .then((res) => setPanelImages(res.data))
            .catch(err => console.log("error"))

        axios.get('/route/productBrandImg/inverter')
            .then((res) => setInverterImages(res.data))
            .catch(err => console.log("error"))

        axios.get('/route/productBrandImg/hybrid_inverter')
            .then((res) => setHybrid_inverterImages(res.data))
            .catch(err => console.log("error"))

        axios.get('/route/productBrandImg/battery')
            .then((res) => setBatteryImages(res.data))
            .catch(err => console.log("error"))

        axios.get('/route/productBrandImg/charger')
            .then((res) => setBchargerImages(res.data))
            .catch(err => console.log("error"))

        axios.get('/route/productBrandImg/optimizer')
            .then((res) => setOptimizerImages(res.data))
            .catch(err => console.log("error"))

        if (stateData == "") {
            console.log("no data to show")
        } else {
            axios.get(`/route/getRebate/${stateData}`)
                .then((res) => setDiscounts({ ...discounts, panel_rebate: Number(res.data[0].panel_rebate), battery_rebate: Number(res.data[0].battery_rebate) }))
                .catch(err => {
                    console.log("error")
                    toast({
                        title: 'Error',
                        description: "Please select correct state",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });

                    // Redirect to error page
                    router.push('/');
                })
        }

    }, []);

    useEffect(() => {
        const floorValue = watch('floors');
        const roofValue = watch('roof');
        const roofMaterialVlaue = watch('roofMaterial');
        const meterTypeValue = watch('meterType');
        const existingPanelValue = watch('existingPanel')
        console.log("some value to form is changed")
        if (summary.panel != "" || summary.panel.hidden == "allow") {
            console.log("updating the floor value")
            let to_multiply_with = 0;
            let to_add_with = 0;
            let panelCount = Number(summary.panel.number_of_panels)
            if (floorValue == "multi") {
                to_add_with = to_add_with + 500;
            }

            if (roofValue == "flate") {
                to_multiply_with = to_multiply_with + 50
            }

            if (roofMaterialVlaue == "Kilp/Lock") {
                to_multiply_with = to_multiply_with + 40
            } else if (roofMaterialVlaue == "Tile") {
                to_multiply_with = to_multiply_with + 10
            } else if (roofMaterialVlaue == "Concrete") {
                to_multiply_with = to_multiply_with + 15
            } else if (roofMaterialVlaue == "Terracotta") {
                to_multiply_with = to_multiply_with + 25
            }

            if (meterTypeValue == "Single" && (allPanelAndInverterType[panelAndInverterType - 1].panel == "8KW" || allPanelAndInverterType[panelAndInverterType - 1].panel == "9KW")) {
                to_add_with = to_add_with + 400;
            } else if (meterTypeValue == "Three") {
                to_add_with = to_add_with + 800;
            }

            if (existingPanelValue == "Yes") {
                to_add_with = to_add_with + 400;
            }

            const extraPrice = (panelCount * to_multiply_with) + to_add_with
            setSummaryExtra({
                ...summaryExtra,
                brand: "Extra Cost",
                model: "(Due to type of roof and other reasons)",
                price: extraPrice,
                hidden: "allow"
            })
            setTotalSummaryPrice({ ...totalSummaryPrice, extra: extraPrice })
            const totalPanelAmount = Number(extraPrice) + Number(summary.panel.price)
            setTotalSummaryPrice({ ...totalSummaryPrice, panel: totalPanelAmount })
        }
    }, [watch('floors'), watch('roof'), watch('roofMaterial'), watch('meterType'), watch('existingPanel')])



    return (
        <div >
            <Head>
                <title>Make My Energy</title>
                <meta name="description" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <div className='bg-white'>
                <Navbar />


                <FormProvider handleSubmit={handleSubmit}
                    register={register}
                    {...formMethods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Container maxW='6xl' className='mt-20' >
                            <Grid
                                templateColumns={{
                                    sm: 'repeat(2,1fr)',
                                    md: 'repeat(5,1fr)',
                                    xl: 'repeat(5,1fr)'
                                }}
                                gap={4}
                            >
                                <GridItem colSpan={3}  >
                                    <Accordion defaultIndex={[0]} allowToggle >

                                        <AccordionItem className='border-2 border-black shadow-md rounded-lg '>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <div className='text-blue-900 text-lg font-semibold'>Basic Information</div>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel >
                                                <Grid
                                                    templateColumns={{
                                                        sm: 'repeat(1,1fr)',
                                                        md: 'repeat(2,1fr)',
                                                        xl: 'repeat(2,1fr)'
                                                    }}
                                                    gap={4}
                                                >
                                                    <GridItem>
                                                        <VStack spacing={4} align='stretch'>
                                                            <Box>
                                                                <p className='font-semibold text-base text-slate-600'>Enter Your Bill</p>
                                                            </Box>
                                                            <Box className='px-4 pb-4'>
                                                                <Box pt={6} pb={2}>
                                                                    <Slider min={1} max={755} aria-label='slider-ex-6' onBlur={() => setPanelAndInverter()} onChange={(val) => setBillValues(val)} >
                                                                        <SliderMark value={0} {...labelStyles} className="pl-2">
                                                                            $0
                                                                        </SliderMark>
                                                                        <SliderMark value={680} {...labelStyles}>
                                                                            $750+
                                                                        </SliderMark>
                                                                        <SliderMark
                                                                            textAlign='center'
                                                                            bg='blue.900'
                                                                            color='white'
                                                                            mt='-10'
                                                                            ml='-5'
                                                                            w='12'
                                                                            value={bill}
                                                                        >
                                                                            ${bill}
                                                                        </SliderMark>
                                                                        <SliderTrack>
                                                                            <SliderFilledTrack />
                                                                        </SliderTrack>
                                                                        <SliderThumb />
                                                                    </Slider>
                                                                </Box>
                                                            </Box>
                                                        </VStack>
                                                    </GridItem>
                                                    <GridItem>
                                                        <VStack spacing={4} align='stretch'>
                                                            <Box>
                                                                <p className='font-semibold text-base text-slate-600'>Enter postcode</p>
                                                            </Box>
                                                            <Box >
                                                                <Input placeholder='Postcode' bg='gray.200' size='lg' {...register("pincodes", { validate: validatePinCode })} />
                                                                {errors.pincodes &&
                                                                    <p role="alert" className='text-red-400'>{errors.pincodes.message}</p>
                                                                    // <Alert status='error'>
                                                                    // <AlertIcon />
                                                                    // <AlertTitle>Your browser is outdated!</AlertTitle>
                                                                    // <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
                                                                    // </Alert>
                                                                }
                                                            </Box>
                                                        </VStack>
                                                    </GridItem>
                                                </Grid>
                                            </AccordionPanel>
                                        </AccordionItem>

                                        <AccordionItem className='border-2 border-black shadow-md rounded-lg mt-6'>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <div className='text-blue-900 text-lg font-semibold'>Property Information</div>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel >
                                                <VStack spacing={4} align='stretch' >
                                                    {
                                                        propertyType == "res" ?
                                                            <Box>
                                                                <p className='font-semibold text-base text-slate-600'>Select Property Type</p>
                                                                <HStack spacing={4} className="-mt-2">
                                                                    <Box className='p-4 border-2 my-4 rounded-lg border-gray-400 w-1/2 border-blue-900'>
                                                                        <Image
                                                                            boxSize='100%'
                                                                            src="/property1.png"
                                                                            alt='Dan Abramov'
                                                                        />
                                                                        <p className='text-black text-slate-700 text-center mt-4 font-medium'>Residential</p>

                                                                    </Box>
                                                                    <Box className='p-4 border-2 border-black my-4 rounded-lg border-gray-400 w-1/2 hover:border-blue-900' onClick={() => changeThePropertyType("com")}>

                                                                        <Image
                                                                            boxSize='82%'
                                                                            src="/property2.png"
                                                                            alt='Dan Abramov'
                                                                            className='m-auto'
                                                                        />

                                                                        <p className='text-black text-slate-700 text-center mt-4 font-medium'>Commercial</p>

                                                                    </Box>
                                                                </HStack>
                                                            </Box> :
                                                            <Box>
                                                                <p className='font-semibold text-base text-slate-600'>Select Property Type</p>
                                                                <HStack spacing={4} className="-mt-2">
                                                                    <Box className='p-4 border-2 border-black my-4 rounded-lg border-gray-400 w-1/2 hover:border-blue-900' onClick={() => changeThePropertyType("res")}>
                                                                        <Image
                                                                            boxSize='100%'
                                                                            src="/property1.png"
                                                                            alt='Dan Abramov'
                                                                        />
                                                                        <p className='text-black text-slate-700 text-center mt-4 font-medium'>Residential</p>

                                                                    </Box>
                                                                    <Box className='p-4 border-2 my-4 rounded-lg border-gray-400 w-1/2 border-blue-900'>

                                                                        <Image
                                                                            boxSize='82%'
                                                                            src="/property2.png"
                                                                            alt='Dan Abramov'
                                                                            className='m-auto'
                                                                        />

                                                                        <p className='text-black text-slate-700 text-center mt-4 font-medium'>Commercial</p>

                                                                    </Box>
                                                                </HStack>
                                                            </Box>
                                                    }


                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Number Of Floors {floorData}</p>
                                                        {errors.floors?.type === 'required' && <p role="alert" className='text-red-400'>Floors details is required {floorData} </p>}
                                                        <RadioGroup className='mt-2 t' defaultValue="single" >
                                                            <Grid
                                                                templateColumns={{
                                                                    sm: 'repeat(2,1fr)',
                                                                    md: 'repeat(3,1fr)',
                                                                    xl: 'repeat(4,1fr)'
                                                                }}
                                                                gap={4}
                                                            >
                                                                <GridItem ><Radio value='single' {...register("floors", { required: true })} aria-invalid={errors.floors ? "true" : "false"} >Single Storey</Radio></GridItem>
                                                                <GridItem ><Radio value='multi' {...register("floors", { required: true })} aria-invalid={errors.floors ? "true" : "false"}>Multi Storey</Radio></GridItem>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </Box>

                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Types of roof</p>
                                                        {errors.roof?.type === 'required' && <p role="alert" className='text-red-400'>Roof type is required</p>}
                                                        <RadioGroup className='mt-2 t' defaultValue='flate' >
                                                            <Grid
                                                                templateColumns={{
                                                                    sm: 'repeat(2,1fr)',
                                                                    md: 'repeat(3,1fr)',
                                                                    xl: 'repeat(4,1fr)'
                                                                }}
                                                                gap={4}
                                                            >
                                                                <GridItem><Radio value='flate' {...register("roof", { required: true })} aria-invalid={errors.roof ? "true" : "false"}>Flat Roof</Radio></GridItem>
                                                                <GridItem><Radio value='pitched' {...register("roof", { required: true })} aria-invalid={errors.roof ? "true" : "false"}>Pitched Roof</Radio></GridItem>
                                                                <GridItem><Radio value='ground' {...register("roof", { required: true })} aria-invalid={errors.roof ? "true" : "false"}>Ground Mount</Radio></GridItem>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </Box>

                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Roof Material</p>
                                                        {errors.roofMaterial?.type === 'required' && <p role="alert" className='text-red-400'>Roof Material is required</p>}
                                                        <RadioGroup className='mt-2 t' defaultValue='Tin/Colorbond' >
                                                            <Grid
                                                                templateColumns={{
                                                                    sm: 'repeat(2,1fr)',
                                                                    md: 'repeat(3,1fr)',
                                                                    xl: 'repeat(4,1fr)'
                                                                }}
                                                                gap={4}
                                                            >
                                                                <GridItem ><Radio value='Tin/Colorbond' {...register("roofMaterial", { required: true })} aria-invalid={errors.roofMaterial ? "true" : "false"}>Tin/Colorbond</Radio></GridItem>
                                                                <GridItem><Radio value='Klip/Lock'{...register("roofMaterial", { required: true })} aria-invalid={errors.roofMaterial ? "true" : "false"}>Klip/Lock</Radio></GridItem>
                                                                <GridItem><Radio value='Tile'{...register("roofMaterial", { required: true })} aria-invalid={errors.roofMaterial ? "true" : "false"}>Tile</Radio></GridItem>
                                                                <GridItem><Radio value='Concrete'{...register("roofMaterial", { required: true })} aria-invalid={errors.roofMaterial ? "true" : "false"}>Concrete</Radio></GridItem>
                                                                <GridItem><Radio value='Terracotta'{...register("roofMaterial", { required: true })} aria-invalid={errors.roofMaterial ? "true" : "false"}>Terracotta</Radio></GridItem>
                                                                <GridItem><Radio value='Mixed'{...register("roofMaterial", { required: true })} aria-invalid={errors.roofMaterial ? "true" : "false"}>Mixed Type</Radio></GridItem>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </Box>

                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Type of meter</p>
                                                        {errors.meterType?.type === 'required' && <p role="alert" className='text-red-400'>Meter Type is required</p>}
                                                        <RadioGroup className='mt-2 t' defaultValue='IDK' >
                                                            <Grid
                                                                templateColumns={{
                                                                    sm: 'repeat(2,1fr)',
                                                                    md: 'repeat(3,1fr)',
                                                                    xl: 'repeat(4,1fr)'
                                                                }}
                                                                gap={4}
                                                            >
                                                                <GridItem ><Radio value='Single' {...register("meterType", { required: true })} aria-invalid={errors.meterType ? "true" : "false"}>Single Phase</Radio></GridItem>
                                                                <GridItem><Radio value='Two'{...register("meterType", { required: true })} aria-invalid={errors.meterType ? "true" : "false"}>Two Phase</Radio></GridItem>
                                                                <GridItem><Radio value='Three'{...register("meterType", { required: true })} aria-invalid={errors.meterType ? "true" : "false"}>Three Phase</Radio></GridItem>
                                                                <GridItem><Radio value='IDK'{...register("meterType", { required: true })} aria-invalid={errors.meterType ? "true" : "false"}>I don’t know</Radio></GridItem>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </Box>

                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Do you have existing panels ?</p>
                                                        {errors.existingPanel?.type === 'required' && <p role="alert" className='text-red-400'>Existing Panel detail is required</p>}
                                                        <RadioGroup className='mt-2 t' defaultValue='No' >
                                                            <Grid
                                                                templateColumns={{
                                                                    sm: 'repeat(2,1fr)',
                                                                    md: 'repeat(3,1fr)',
                                                                    xl: 'repeat(4,1fr)'
                                                                }}
                                                                gap={4}
                                                            >
                                                                <GridItem><Radio value='Yes' {...register("existingPanel", { required: true })} aria-invalid={errors.existingPanel ? "true" : "false"}>Yes</Radio></GridItem>
                                                                <GridItem><Radio value='No' {...register("existingPanel", { required: true })} aria-invalid={errors.existingPanel ? "true" : "false"}>No</Radio></GridItem>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </Box>

                                                </VStack>
                                            </AccordionPanel>
                                        </AccordionItem>

                                        {/* recommended */}
                                        <AccordionItem className='border-2 border-black shadow-md rounded-lg mt-6'>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <div className='text-blue-900 text-lg font-semibold'>Recommended Solar System Information</div>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel >

                                                <Grid
                                                    templateColumns={{
                                                        sm: 'repeat(2,1fr)',
                                                        md: 'repeat(2,1fr)',
                                                        xl: 'repeat(3,1fr)'
                                                    }}
                                                    gap={4}
                                                >
                                                    {allPanelAndInverterType.map((singleProduct, index) => (
                                                        index + 1 == panelAndInverterType ?
                                                            (<GridItem key={index} className="-mt-2">
                                                                <Box className='p-4 border-[3px] my-4 rounded-lg w-full border-blue-900' onClick={() => setPanelAndInverterRecommended(index)}>
                                                                    <HStack className='flex justify-between' >
                                                                        <Box>
                                                                            <Image
                                                                                boxSize='100%'
                                                                                src="recPanel.png"
                                                                                alt='Dan Abramov'
                                                                                className='m-auto'
                                                                            />
                                                                        </Box>
                                                                        <Box>
                                                                            <Image
                                                                                boxSize='100%'
                                                                                src="recMeter.png"
                                                                                alt='Dan Abramov'
                                                                                className='m-auto'
                                                                            />
                                                                        </Box>
                                                                    </HStack>
                                                                    <HStack className='flex justify-around' >
                                                                        <Box>
                                                                            <p className='text-black text-slate-700 text-center mt-4 font-medium'>{singleProduct.panel} </p>
                                                                        </Box>
                                                                        <Box>
                                                                            <p className='text-black text-slate-700 text-center mt-4 font-medium'>+</p>
                                                                        </Box>
                                                                        <Box>
                                                                            <p className='text-black text-slate-700 text-center mt-4 font-medium'>{singleProduct.inverter} </p>
                                                                        </Box>
                                                                    </HStack>
                                                                </Box>
                                                            </GridItem>) : ((<GridItem key={index} className="-mt-2">
                                                                <Box className='p-4 border-2 border-black my-4 rounded-lg border-gray-400 w-full hover:border-blue-900' onClick={() => setPanelAndInverterRecommended(index)}>
                                                                    <HStack className='flex justify-between'>
                                                                        <Box>
                                                                            <Image
                                                                                boxSize='100%'
                                                                                src="recPanel.png"
                                                                                alt='Dan Abramov'
                                                                                className='m-auto'
                                                                            />
                                                                        </Box>
                                                                        <Box>
                                                                            <Image
                                                                                boxSize='100%'
                                                                                src="recMeter.png"
                                                                                alt='Dan Abramov'
                                                                                className='m-auto'
                                                                            />
                                                                        </Box>
                                                                    </HStack>
                                                                    <HStack className='flex justify-around'>
                                                                        <Box>
                                                                            <p className='text-black text-slate-700 text-center mt-4 font-medium'>{singleProduct.panel}</p>
                                                                        </Box>
                                                                        <Box>
                                                                            <p className='text-black text-slate-700 text-center mt-4 font-medium'>+</p>
                                                                        </Box>
                                                                        <Box>
                                                                            <p className='text-black text-slate-700 text-center mt-4 font-medium'>{singleProduct.inverter}</p>
                                                                        </Box>
                                                                    </HStack>
                                                                </Box>
                                                            </GridItem>))
                                                    ))}


                                                </Grid>
                                            </AccordionPanel>
                                        </AccordionItem>

                                        {/*panel*/}
                                        <AccordionItem className='border-2 border-black shadow-md rounded-lg mt-6'>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <div className='text-blue-900 text-lg font-semibold'>Solar Panel</div>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel >
                                                <VStack spacing={4} align='stretch' >
                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Choose Panel</p>

                                                        <Box className=' border-2 border-black my-4 rounded-lg border-gray-400 '>
                                                            <div className=' mx-auto flex flex-wrap justify-around h-fit sm:h-32 overflow-auto'>

                                                                {panelImages.map((panel) => (
                                                                    <span key={panel._id.brand} className="m-4" onClick={() => getPanels(panel._id.brand)}>
                                                                        <Image
                                                                            src={panel._id.logo_image_url}
                                                                            alt={panel._id.brand}
                                                                            className="w-[100px]"
                                                                        />
                                                                    </span>
                                                                ))}

                                                            </div>

                                                            <div className={panelHidden}>
                                                                <hr className="m-auto w-[95%] border border-gray-400" />
                                                                <div className='w-[100%]'>
                                                                    <Box className='w-[95%] sm:w-[65%] border-2 border-gray-400 mx-auto my-4 rounded-lg '>
                                                                        <HStack>
                                                                            <Box className='w-[35%]'>
                                                                                <Image
                                                                                    src={summary.panel.product_image_url}
                                                                                />
                                                                            </Box>
                                                                            <Box>
                                                                                <p className='text-base font-semibold mt-4 mb-2'>{summary.panel.brand} {summary.panel.model}</p>
                                                                                <div className='mb-2'>
                                                                                    <ul >
                                                                                        <li className='text-sm'>Product Warranty {summary.panel.prod_warranty}</li>
                                                                                        <li className='text-sm'>Efficiency Warranty {summary.panel.efficiancy_warranty}</li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div className='mb-2 mt-2'>
                                                                                    {panelData.map((panel) => (
                                                                                        panel.size.includes(allPanelAndInverterType[panelAndInverterType - 1].panel) ?
                                                                                            panel._id == summary.panel._id ?
                                                                                                <span key={panel._id} onClick={() => handleAddNewBill(panel, "panel")} className="m-1 inline-block flex-auto rounded font-semibold py-1 px-2 text-sm text-white bg-[#21376C]">
                                                                                                    {panel.model} kw
                                                                                                </span> :
                                                                                                <span key={panel._id} onClick={() => handleAddNewBill(panel, "panel")} className="m-1 inline-block flex-auto rounded font-semibold hover:bg-[#21376C] hover:text-white py-1 px-2 text-sm text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                                                    {panel.model} kw
                                                                                                </span> :
                                                                                            null
                                                                                    ))}
                                                                                </div>
                                                                            </Box>
                                                                        </HStack>
                                                                    </Box>

                                                                </div>
                                                            </div>
                                                        </Box>
                                                    </Box>
                                                </VStack>
                                            </AccordionPanel>
                                        </AccordionItem>

                                        {/* inverter */}
                                        <AccordionItem className='border-2 border-black shadow-md rounded-lg mt-6'>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <div className='text-blue-900 text-lg font-semibold'>Inverter</div>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel >
                                                <VStack spacing={4} align='stretch' >
                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Choose Inverter</p>

                                                        <Box className=' border-2 border-black my-4 rounded-lg border-gray-400 '>
                                                            <div className='mx-auto flex flex-wrap justify-around h-fit sm:h-32 overflow-auto'>

                                                                {inverterImages.map((inverter) => (
                                                                    <span key={inverter._id.brand} className="m-4" onClick={() => getInverters(inverter._id.brand)}>
                                                                        <Image
                                                                            src={inverter._id.logo_image_url}
                                                                            alt={inverter._id.brand}
                                                                            className="w-[100px]"
                                                                        />
                                                                    </span>
                                                                ))}

                                                            </div>

                                                            <div className={inverterHidden}>
                                                                <hr className="m-auto w-[95%] border border-gray-400" />
                                                                <div className='w-[100%]'>
                                                                    <Box className='w-[50%] border-2 border-gray-400 mx-auto my-4 rounded-lg '>
                                                                        {
                                                                            inverterData == "empty" ?
                                                                                <p className='p-4'>Sorry No data available</p> :
                                                                                <HStack>
                                                                                    <Box className='w-[35%]'>
                                                                                        <Image
                                                                                            src={summary.inverter.product_image_url}
                                                                                        />
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <p className='text-base font-semibold mt-4 mb-2'>{summary.inverter.brand} {summary.inverter.model} </p>
                                                                                        <div className='mb-2'>
                                                                                            <ul >
                                                                                                <li className='text-sm'>Product Warranty {summary.inverter.prod_warranty}</li>
                                                                                                <li className='text-sm'>Efficiency Warranty {summary.inverter.efficiancy_warranty}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className='mb-2 mt-2'>
                                                                                            {inverterData.map((inverterD) => (
                                                                                                inverterD.size.includes(allPanelAndInverterType[panelAndInverterType - 1].inverter) ?
                                                                                                    inverterD._id == summary.inverter._id ?
                                                                                                        <span key={inverterD._id} onClick={() => handleAddNewBill(inverterD, "inverter")} className="m-1 inline-block flex-auto rounded font-semibold py-1 px-2 text-sm text-white bg-[#21376C]">
                                                                                                            {inverterD.model}
                                                                                                        </span> :
                                                                                                        <span key={inverterD._id} onClick={() => handleAddNewBill(inverterD, "inverter")} className="m-1 inline-block flex-auto rounded font-semibold hover:bg-[#21376C] hover:text-white py-1 px-2 text-sm text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                                                            {inverterD.model}
                                                                                                        </span> : null
                                                                                            ))}
                                                                                        </div>
                                                                                    </Box>
                                                                                </HStack>
                                                                        }
                                                                    </Box>

                                                                </div>
                                                            </div>
                                                        </Box>
                                                    </Box>
                                                </VStack>
                                            </AccordionPanel>
                                        </AccordionItem>

                                        {/* battery */}
                                        <AccordionItem className='border-2 border-black shadow-md rounded-lg mt-6'>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <div className='text-blue-900 text-lg font-semibold'>Battery</div>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel >
                                                <VStack spacing={4} align='stretch' >
                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Do you need battery ?</p>
                                                        <RadioGroup defaultValue='1' className='mt-2 t'>
                                                            <Grid
                                                                templateColumns={{
                                                                    sm: 'repeat(2,1fr)',
                                                                    md: 'repeat(3,1fr)',
                                                                    xl: 'repeat(4,1fr)'
                                                                }}
                                                                gap={4}
                                                            >
                                                                <GridItem onClick={() => changeWantBattery("")}><Radio value='1'>Yes</Radio></GridItem>
                                                                <GridItem onClick={() => changeWantBattery("hidden")}><Radio value='2'>No</Radio></GridItem>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </Box>
                                                    <Box className={wantBattery}>
                                                        <p className='font-semibold text-base text-slate-600'>Choose Battery</p>

                                                        <Box className=' border-2 border-black my-4 rounded-lg border-gray-400 '>
                                                            <div className='mx-auto flex flex-wrap justify-around h-fit sm:h-32 overflow-auto'>

                                                                {batteryImages.map((battery) => (
                                                                    <span key={battery._id.brand} className="m-4" onClick={() => getBattery(battery._id.brand)}>
                                                                        <Image
                                                                            src={battery._id.logo_image_url}
                                                                            alt={battery._id.brand}
                                                                            className="w-[100px]"
                                                                        />
                                                                    </span>
                                                                ))}

                                                            </div>

                                                            <div className={batteryHidden}>
                                                                <hr className="m-auto w-[95%] border border-gray-400" />
                                                                <div className='w-[100%]'>
                                                                    <Box className='w-[50%] border-2 border-gray-400 mx-auto my-4 rounded-lg '>
                                                                        <HStack>
                                                                            <Box className='w-[35%]'>
                                                                                <Image
                                                                                    src={summary.battery.product_image_url}
                                                                                />
                                                                            </Box>
                                                                            <Box>
                                                                                <p className='text-base font-semibold mt-4 mb-2'>{summary.battery.brand} {summary.battery.model} </p>
                                                                                <div className='mb-2'>
                                                                                    <ul >
                                                                                        <li className='text-sm'>Product Warranty {summary.battery.prod_warranty}</li>
                                                                                        <li className='text-sm'>Efficiency Warranty {summary.battery.efficiancy_warranty}</li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div className='mb-2 mt-2'>
                                                                                    {batteryData.map((batteryD) => (
                                                                                        batteryD._id == summary.battery._id ?
                                                                                            <span key={batteryD._id} onClick={() => handleAddNewBill(batteryD, "battery", "with_eps")} className="m-1 inline-block flex-auto rounded font-semibold py-1 px-2 text-sm text-white bg-[#21376C]">
                                                                                                {batteryD.model}
                                                                                            </span> :
                                                                                            <span key={batteryD._id} onClick={() => handleAddNewBill(batteryD, "battery", "with_eps")} className="m-1 inline-block flex-auto rounded font-semibold hover:bg-[#21376C] hover:text-white py-1 px-2 text-sm text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                                                {batteryD.model}
                                                                                            </span>
                                                                                    ))}
                                                                                </div>
                                                                                <hr className='border-1 border-gray-600 w-[90%] m-auto mb-2' />
                                                                                <diV>
                                                                                    {
                                                                                        summary.battery.size == "With EPS" ?
                                                                                            <div>
                                                                                                <span onClick={() => handleAddNewBill(selectedBattery, "battery", "with_eps")} className="m-1 inline-block flex-auto rounded font-semibold py-1 px-2 text-sm text-white bg-[#21376C]">
                                                                                                    With EPS
                                                                                                </span>
                                                                                                <span onClick={() => handleAddNewBill(selectedBattery, "battery", "without_eps")} className="m-1 inline-block flex-auto rounded font-semibold hover:bg-[#21376C] hover:text-white py-1 px-2 text-sm text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                                                    Without EPS
                                                                                                </span>
                                                                                            </div> :
                                                                                            <div>
                                                                                                <span onClick={() => handleAddNewBill(selectedBattery, "battery", "with_eps")} className="m-1 inline-block flex-auto rounded font-semibold hover:bg-[#21376C] hover:text-white py-1 px-2 text-sm text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                                                    With EPS
                                                                                                </span>
                                                                                                <span onClick={() => handleAddNewBill(selectedBattery, "battery", "without_eps")} className="m-1 inline-block flex-auto rounded font-semibold py-1 px-2 text-sm text-white bg-[#21376C]">
                                                                                                    Without EPS
                                                                                                </span>
                                                                                            </div>
                                                                                    }

                                                                                </diV>
                                                                            </Box>
                                                                        </HStack>
                                                                    </Box>

                                                                </div>
                                                            </div>
                                                        </Box>
                                                    </Box>
                                                </VStack>
                                            </AccordionPanel>
                                        </AccordionItem>

                                        {/* additional product */}
                                        <AccordionItem className={wantBattery}>
                                            <div className='border-2 border-gray-200 shadow-md rounded-lg mt-6'>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as="span" flex='1' textAlign='left'>
                                                            <div className='text-blue-900 text-lg font-semibold'>Select additional product</div>
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel >
                                                    {panelAndInverterType < 2 ?
                                                        (<VStack spacing={4} align='stretch' >
                                                            <Box>
                                                                <p className='font-semibold text-base text-slate-600'>Select one of from below option.</p>
                                                                <RadioGroup className='mt-2 t' defaultValue='yes'>
                                                                    <Grid
                                                                        templateColumns={{
                                                                            sm: 'repeat(2,1fr)',
                                                                            md: 'repeat(3,1fr)',
                                                                            xl: 'repeat(4,1fr)'
                                                                        }}
                                                                        gap={4}
                                                                    >
                                                                        <GridItem onClick={() => ChangeAdditionalProductType("hybrid")}><Radio value='yes' >Hybrid Inverter</Radio></GridItem>
                                                                        <GridItem onClick={() => ChangeAdditionalProductType("charger")}><Radio value='no' >Battery Charger</Radio></GridItem>
                                                                    </Grid>
                                                                </RadioGroup>
                                                            </Box>
                                                            {additionalType == "hybrid" ?
                                                                <Box>
                                                                    <p className='font-semibold text-base text-slate-600'>Choose Hybrid Inverter</p>

                                                                    <Box className=' border-2 border-black my-4 rounded-lg border-gray-400 '>
                                                                        <div className='mx-auto flex flex-wrap justify-around h-fit sm:h-32 overflow-auto'>

                                                                            {hybrid_inverterImages.map((inverter) => (
                                                                                <span key={inverter._id.brand} className="m-4" onClick={() => getHybridInverters(inverter._id.brand)}>
                                                                                    <Image
                                                                                        src={inverter._id.logo_image_url}
                                                                                        alt={inverter._id.brand}
                                                                                        className="w-[100px]"
                                                                                    />
                                                                                </span>
                                                                            ))}

                                                                        </div>

                                                                        <div className={hybrid_inverterHidden}>
                                                                            <hr className="m-auto w-[95%] border border-gray-400" />
                                                                            <div className='w-[100%]'>
                                                                                <Box className='w-[50%] border-2 border-gray-400 mx-auto my-4 rounded-lg '>
                                                                                    <HStack>
                                                                                        <Box className='w-[35%]'>
                                                                                            <Image
                                                                                                src={summary.inverter.product_image_url}
                                                                                            />
                                                                                        </Box>
                                                                                        <Box>
                                                                                            <p className='text-base font-semibold mt-4 mb-2'>{summary.inverter.brand} {summary.inverter.model} </p>
                                                                                            <div className='mb-2'>
                                                                                                <ul >
                                                                                                    <li className='text-sm'>Product Warranty {summary.inverter.prod_warranty}</li>
                                                                                                    <li className='text-sm'>Efficiency Warranty {summary.inverter.efficiancy_warranty}</li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            <div className='mb-2 mt-2'>
                                                                                                {inverterData.map((inverterD) => (
                                                                                                    inverterD._id == summary.inverter._id ?
                                                                                                        <span key={inverterD._id} onClick={() => handleAddNewBill(inverterD, "inverter")} className="m-1 inline-block flex-auto rounded font-semibold py-1 px-2 text-sm text-white bg-[#21376C]">
                                                                                                            {inverterD.model}
                                                                                                        </span> :
                                                                                                        <span key={inverterD._id} onClick={() => handleAddNewBill(inverterD, "inverter")} className="m-1 inline-block flex-auto rounded font-semibold hover:bg-[#21376C] hover:text-white py-1 px-2 text-sm text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                                                            {inverterD.model}
                                                                                                        </span>
                                                                                                ))}
                                                                                            </div>
                                                                                        </Box>
                                                                                    </HStack>
                                                                                </Box>

                                                                            </div>
                                                                        </div>
                                                                    </Box>
                                                                </Box> :
                                                                <Box>
                                                                    <p className='font-semibold text-base text-slate-600'>Battery Charger is selected of {summary.battery.brand} {summary.battery.model}</p>
                                                                </Box>
                                                            }

                                                        </VStack>) : <VStack spacing={4} align='stretch' >
                                                            <GridItem><Radio value='no' onClick={() => ChangeAdditionalProductType("charger")}>Battery Charger</Radio></GridItem>
                                                            <Box>
                                                                {summary.charger == "" || summary.charger.hidden == "hidden" ?
                                                                    <p className='font-semibold text-base text-slate-600'>Please click on Battery Charger to buy one</p> :
                                                                    <p className='font-semibold text-base text-slate-600'>Battery Charger is selected of {summary.battery.brand} {summary.battery.model}</p>
                                                                }
                                                            </Box>
                                                        </VStack>
                                                    }
                                                </AccordionPanel>
                                            </div>
                                        </AccordionItem>

                                        {/*optimizer*/}
                                        <AccordionItem className='border-2 border-black shadow-md rounded-lg mt-6'>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <div className='text-blue-900 text-lg font-semibold'>Optimizer</div>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel >
                                                <VStack spacing={4} align='stretch' >
                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Do you have shading on your roof? Don’t worry! Optimizers can solve your problem.</p>
                                                        <RadioGroup className='mt-2 t' defaultValue='no'>
                                                            <Grid
                                                                templateColumns={{
                                                                    sm: 'repeat(2,1fr)',
                                                                    md: 'repeat(3,1fr)',
                                                                    xl: 'repeat(4,1fr)'
                                                                }}
                                                                gap={4}
                                                            >
                                                                <GridItem onClick={() => ChangeOptimizerShowValue("yes")}><Radio value='yes'>Yes</Radio></GridItem>
                                                                <GridItem onClick={() => ChangeOptimizerShowValue("no")}><Radio value='no' >No</Radio></GridItem>

                                                            </Grid>
                                                        </RadioGroup>

                                                    </Box>

                                                    {showOptimizer == "yes" ?
                                                        <Box>

                                                            {/* <select
                                                                value={selectedOption}
                                                                onChange={handleOptionChange}
                                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                                            >
                                                                <option value="">Select an option</option>
                                                                <option value="option1">Option 1</option>
                                                                <option value="option2">Option 2</option>
                                                                <option value="option3">Option 3</option>
                                                            </select> */}

                                                            <p className='font-semibold text-base text-slate-600 mt-4'>Add Optimizer</p>

                                                            {
                                                                summary.optimizer != "" && summary.optimizer.hidden != "hidden" ?
                                                                    <Box className='mt-2 flex'>
                                                                        Number of Optimizers
                                                                        {/* <Tooltip label='Phone number' fontSize='md'>
                                                                        <HiInformationCircle />
                                                                        </Tooltip> */}
                                                                        <select onChange={handleSelect} className="border-2 border-gray-600 rounded-lg ml-4">
                                                                            {
                                                                                Array.from({ length: summary.panel.number_of_panels ? summary.panel.number_of_panels : 8 }, (_, index) => index + 1).map((item, index) => (
                                                                                    item == numberOfOptimizers ?
                                                                                        <option value={item} key={index} selected>{item}</option> :
                                                                                        <option value={item} key={index}>{item}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </Box> : null
                                                            }

                                                            <Box className=' border-2 border-black my-4 rounded-lg border-gray-400 '>
                                                                <div className='mx-auto flex flex-wrap justify-around h-fit sm:h-32 overflow-auto'>

                                                                    {optimizerImages.map((singleOptimizer) => (
                                                                        <span key={singleOptimizer._id.brand} className="m-4" onClick={() => getOptimizer(singleOptimizer._id.brand,)}>
                                                                            <Image
                                                                                src={singleOptimizer._id.logo_image_url}
                                                                                alt={singleOptimizer._id.brand}
                                                                                className="w-[100px]"
                                                                            />
                                                                        </span>
                                                                    ))}

                                                                </div>

                                                                <div className={optimizerHidden}>
                                                                    <hr className="m-auto w-[95%] border border-gray-400" />
                                                                    <div className='w-[100%]'>
                                                                        <Box className='w-[50%] border-2 border-gray-400 mx-auto my-4 rounded-lg '>
                                                                            <HStack>
                                                                                <Box className='w-[35%]'>
                                                                                    <Image
                                                                                        src={summary.optimizer.product_image_url}
                                                                                    />
                                                                                </Box>
                                                                                <Box>
                                                                                    <p className='text-base font-semibold mt-4 mb-2'>{summary.optimizer.brand} {summary.optimizer.model} </p>
                                                                                    <div className='mb-2'>
                                                                                        <ul >
                                                                                            <li className='text-sm'>Product Warranty {summary.optimizer.prod_warranty}</li>
                                                                                            <li className='text-sm'>Efficiency Warranty {summary.optimizer.efficiancy_warranty}</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div className='mb-2 mt-2'>
                                                                                        {optimizerData.map((oneoptimizer) => (
                                                                                            oneoptimizer._id == summary.optimizer._id ?
                                                                                                <span key={oneoptimizer._id} onClick={() => handleAddNewBill(oneoptimizer, "optimizer")} className="m-1 inline-block flex-auto rounded font-semibold py-1 px-2 text-sm text-white bg-[#21376C]">
                                                                                                    {oneoptimizer.model}
                                                                                                </span> :
                                                                                                <span key={oneoptimizer._id} onClick={() => handleAddNewBill(oneoptimizer, "optimizer")} className="m-1 inline-block flex-auto rounded font-semibold hover:bg-[#21376C] hover:text-white py-1 px-2 text-sm text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                                                    {oneoptimizer.model}
                                                                                                </span>
                                                                                        ))}
                                                                                    </div>
                                                                                </Box>
                                                                            </HStack>
                                                                        </Box>

                                                                    </div>
                                                                </div>
                                                            </Box>
                                                        </Box> : null
                                                    }


                                                </VStack>
                                            </AccordionPanel>
                                        </AccordionItem>

                                        {/*charger */}
                                        <AccordionItem className='border-2 border-black shadow-md rounded-lg mt-6'>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <div className='text-blue-900 text-lg font-semibold'>EV Charger</div>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel >
                                                <VStack spacing={4} align='stretch' >
                                                    <Box>
                                                        <p className='font-semibold text-base text-slate-600'>Do you have an electric vehicle or are you planning to buy one?</p>
                                                        <RadioGroup className='mt-2' defaultValue='no'>
                                                            <Grid
                                                                templateColumns={{
                                                                    sm: 'repeat(2,1fr)',
                                                                    md: 'repeat(3,1fr)',
                                                                    xl: 'repeat(4,1fr)'
                                                                }}
                                                                gap={4}
                                                            >
                                                                <GridItem onClick={() => ChangeEVchargerValue("yes")}><Radio value='yes' >Yes</Radio></GridItem>
                                                                <GridItem onClick={() => ChangeEVchargerValue("no")}><Radio value='no'>No</Radio></GridItem>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </Box>
                                                    {showEVcharger == "yes" ?
                                                        <Box>
                                                            <p className='font-semibold text-base text-slate-600'>Add Battery Charger</p>

                                                            <Box className=' border-2 border-black my-4 rounded-lg border-gray-400 '>
                                                                <div className='mx-auto flex flex-wrap justify-around h-fit sm:h-32 overflow-auto'>

                                                                    {bchargerImages.map((bcharger) => (
                                                                        <span key={bcharger._id.brand} className="m-4" onClick={() => getBcharger(bcharger._id.brand,)}>
                                                                            <Image
                                                                                src={bcharger._id.logo_image_url}
                                                                                alt={bcharger._id.brand}
                                                                                className="w-[100px]"
                                                                            />
                                                                        </span>
                                                                    ))}

                                                                </div>

                                                                <div className={bchargerHidden}>
                                                                    <hr className="m-auto w-[95%] border border-gray-400" />
                                                                    <div className='w-[100%]'>
                                                                        <Box className='w-[50%] border-2 border-gray-400 mx-auto my-4 rounded-lg '>
                                                                            <HStack>
                                                                                <Box className='w-[35%]'>
                                                                                    <Image
                                                                                        src={summary.bcharger.product_image_url}
                                                                                    />
                                                                                </Box>
                                                                                <Box>
                                                                                    <p className='text-base font-semibold mt-4 mb-2'>{summary.bcharger.brand} {summary.bcharger.model} </p>
                                                                                    <div className='mb-2'>
                                                                                        <ul >
                                                                                            <li className='text-sm'>Product Warranty {summary.bcharger.prod_warranty}</li>
                                                                                            <li className='text-sm'>Efficiency Warranty {summary.bcharger.efficiancy_warranty}</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div className='mb-2 mt-2'>
                                                                                        {bchargerData.map((singlecharger) => (
                                                                                            singlecharger._id == summary.bcharger._id ?
                                                                                                <span key={singlecharger._id} onClick={() => handleAddNewBill(singlecharger, "bcharger")} className="m-1 inline-block flex-auto rounded font-semibold py-1 px-2 text-sm text-white bg-[#21376C]">
                                                                                                    {singlecharger.model}
                                                                                                </span> :
                                                                                                <span key={singlecharger._id} onClick={() => handleAddNewBill(singlecharger, "bcharger")} className="m-1 inline-block flex-auto rounded font-semibold hover:bg-[#21376C] hover:text-white py-1 px-2 text-sm text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                                                    {singlecharger.model}
                                                                                                </span>
                                                                                        ))}
                                                                                    </div>
                                                                                </Box>
                                                                            </HStack>
                                                                        </Box>

                                                                    </div>
                                                                </div>
                                                            </Box>

                                                        </Box> : null
                                                    }

                                                </VStack>
                                            </AccordionPanel>
                                        </AccordionItem>

                                    </Accordion>
                                </GridItem>


                                <GridItem colSpan={2}  >
                                    <Grid
                                        templateColumns={{
                                            sm: 'repeat(1,1fr)',
                                            md: 'repeat(5,1fr)',
                                            xl: 'repeat(5,1fr)'
                                        }}
                                        gap={4}
                                    >
                                        <GridItem colSpan={4}>
                                            <Box className=' shadow-md rounded-lg'>
                                                <p className='m-6 text-blue-900 font-medium'>Summary</p>

                                                <VStack className='align-left'>
                                                    {Object.keys(summary).map((bill, index) => (
                                                        // display a <div> element with the user.name and user.type
                                                        // parent element needs to have a unique key
                                                        summary[bill].hidden == "allow" ?
                                                            <div key={index} className="w-[100%]">
                                                                <hr className='border-1 border-black w-[95%] mx-auto' />
                                                                <Grid templateColumns='repeat(3, 1fr)'>
                                                                    <GridItem >
                                                                        <div className='px-6 mt-6'>
                                                                            <Image
                                                                                src={summary[bill].logo_image_url ? summary[bill].logo_image_url : summary[bill].product_image_url}
                                                                                alt='solarImage'
                                                                            />
                                                                        </div>
                                                                    </GridItem>
                                                                    <GridItem colSpan={2} className="p-2">
                                                                        <p className='font-medium text-sm'>{summary[bill].brand} {summary[bill].model} {summary[bill].size}</p>
                                                                        <p className='text-xs font-normal text-gray-700'>Product Warranty {summary[bill].prod_warranty}</p>
                                                                        <p className='text-xs font-normal text-gray-700'>Efficiancy Warranty{summary[bill].efficiancy_warranty}</p>
                                                                        <p className='text-sm font-semibold text-blue-900 mt-3'>$ {summary[bill].price}</p>
                                                                    </GridItem>
                                                                </Grid>
                                                            </div> : null
                                                    ))}
                                                    {
                                                        summaryExtra.hidden == "allow" ?
                                                            <div className='w-[100%]'>
                                                                <hr className='border-1 border-black w-[95%] mx-auto' />
                                                                <div className='px-8 py-4'>
                                                                    <p className='font-medium text-sm'>{summaryExtra.brand}</p>
                                                                    <p className='text-xs font-normal text-gray-700'>{summaryExtra.model}</p>
                                                                    <p className='text-sm font-semibold text-blue-900 mt-3'>$ {summaryExtra.price}</p>
                                                                </div>
                                                            </div> : null
                                                    }


                                                </VStack>
                                                {
                                                    (isNaN(totalSummaryPrice.panel + totalSummaryPrice.inverter + totalSummaryPrice.battery + totalSummaryPrice.charger + totalSummaryPrice.bcharger + totalSummaryPrice.optimizer) || (totalSummaryPrice.panel + totalSummaryPrice.inverter + totalSummaryPrice.battery + totalSummaryPrice.charger + totalSummaryPrice.bcharger + totalSummaryPrice.optimizer) == 0) ? null :
                                                        <div>
                                                            <hr className='border-1 border-black w-[90%] mx-auto' />
                                                            <div className='px-6 my-4 flex justify-between'>
                                                                <p className=' font-semibold text-gray-600'>Price (Including GST)</p>
                                                                <p className='font-semibold text-[#21376C]'>{totalSummaryPrice.panel + totalSummaryPrice.inverter + totalSummaryPrice.battery + totalSummaryPrice.charger + totalSummaryPrice.bcharger + totalSummaryPrice.optimizer + totalSummaryPrice.extra}</p>
                                                            </div>
                                                            {/* {
                                                                discounts.rebate_type==="none"?null: */}
                                                            <div>
                                                                <div className='px-6 -mt-4 flex justify-between'>
                                                                    <p className='mb-2 font-semibold text-gray-600'>Rebates </p>
                                                                    <p className='font-semibold text-[#21376C]'>-{discounts.rebate_type != "none" ?
                                                                        discounts.rebate_type == "battery_rebate" ? discounts.battery_rebate : discounts.panel_rebate :
                                                                        0}</p>
                                                                </div>
                                                            </div>
                                                            {/* } */}
                                                            {
                                                                discounts.stc == 0 ? null :
                                                                    <div>
                                                                        <div className='px-6 -mt-2 flex justify-between'>
                                                                            <p className='mb-2 font-semibold text-gray-600'>STC </p>
                                                                            <p className='font-semibold text-[#21376C]'>-{discounts.stc}</p>
                                                                        </div>
                                                                    </div>
                                                            }

                                                            <hr className='border-1 border-black w-[90%] mx-auto' />
                                                            <div className='px-6 my-4 flex justify-between'>
                                                                <p className=' font-semibold mb-4 text-gray-600'>Total (Including GST)</p>
                                                                <p className='font-semibold text-[#21376C]'>{discounts.rebate_type == "none" ? totalSummaryPrice.panel + totalSummaryPrice.inverter + totalSummaryPrice.battery + totalSummaryPrice.charger + totalSummaryPrice.bcharger + totalSummaryPrice.optimizer + totalSummaryPrice.extra - discounts.stc :
                                                                    discounts.rebate_type == "panel_rebate" ?
                                                                        totalSummaryPrice.panel + totalSummaryPrice.inverter + totalSummaryPrice.battery + totalSummaryPrice.charger + totalSummaryPrice.bcharger + totalSummaryPrice.optimizer + totalSummaryPrice.extra - discounts.panel_rebate - discounts.stc :
                                                                        totalSummaryPrice.panel + totalSummaryPrice.inverter + totalSummaryPrice.battery + totalSummaryPrice.charger + totalSummaryPrice.bcharger + totalSummaryPrice.optimizer + totalSummaryPrice.extra - discounts.battery_rebate - discounts.stc
                                                                }</p>
                                                            </div>

                                                        </div>
                                                }

                                            </Box>
                                        </GridItem>
                                        <GridItem colSpan={4}>
                                            <Box className='shadow-md rounded-lg'>
                                                <Button type='submit' w="100%" colorScheme='facebook'> Submit order for review</Button>
                                                {(errors.pincodes?.type === 'required' || errors.floors?.type === 'required' || errors.roof?.type === 'required' || errors.roofMaterial?.type === 'required' || errors.meterType?.type === 'required' || errors.existingPanel?.type === 'required') &&
                                                    <p role="alert" className='text-red-400 p-2' >Please fill Pincode and Property details</p>
                                                    // <Alert status='error'>
                                                    // <AlertIcon />
                                                    // <AlertTitle>Your browser is outdated!</AlertTitle>
                                                    // <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
                                                    // </Alert>
                                                }
                                            </Box>
                                        </GridItem>

                                    </Grid>
                                </GridItem>

                            </Grid><br /><br />
                        </Container>
                    </form>
                </FormProvider >
            </div>
            {/* Additional Footer Starts Here  */}
            <TopFooter />
        </div>
    )
}


