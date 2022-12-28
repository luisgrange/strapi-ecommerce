import React, {useEffect, useState} from 'react';
import {Box, Typography, Tab, Tabs} from '@mui/material';
import {useMediaQuery} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {Item} from '../../components/Item';
import { setItems } from '../../state';


export const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems(){
        const items = await fetch(
            "http://localhost:1337/api/items?populate=image",
            {method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data))
    }

    useEffect(() => {
        getItems();
    }, [])

    const topRated = items.filter((item) => item.attributes.category === "topRated")
    const newArrivals = items.filter((item) => item.attributes.category === "newArrivals")
    const bestSellers = items.filter((item) => item.attributes.category === "bestSellers")

    return  (
        <Box width="80%" margin="80px auto">
            <Typography variant="h3" textAlign="center">Produtos em <b>Destaque</b></Typography>
            <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{ sx: {display: isNonMobile ? "block" : "none"}}}
            >

                <Tab label="ALL" value="all"/>
                <Tab label="NEW ARRIVALS" value="newArrivals"/>
                <Tab label="BEST SELLERS" value="bestSellers"/>
                <Tab label="TOP RATED" value="topRated"/>
            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {value === "all" &&
                items.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "newArrivals" &&
                newArrivals.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "bestSellers" &&
                bestSellers.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "topRated" &&
                topRated.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
            </Box>
        </Box>
    );
}