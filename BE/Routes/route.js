const {Router} = require('express')
const route = Router()
const http= require('https')
const fs = require('fs');
// const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const { GoogleGenAI } = require("@google/genai");
const path = require('path');
const dotenv = require('dotenv').config({path: '/home/saidarshan74/Desktop/Tripmate/.env'})



route.get('/' ,async(requ,res)=>{

    const placeName = requ.body.placeName;
    const startDate = requ.body.startDate;
    const noOfDays = requ.body.noOfDays;

    //Route to get given placeId from RapidAPI

    const options = {
        method: 'POST',
        hostname: 'travel-advisor.p.rapidapi.com',
        port: null,
        path: '/locations/v2/search?currency=USD&units=km&lang=en_US',
        headers: {
            'x-rapidapi-key': process.env.X_RAPID_API_KEY,
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    async function getPlaceId(query) {
        return new Promise ((resolve,reject) =>{
    
            const req= http.request(options, resp => {
                    let data = ''
                    resp.on('data', chunk => {
                        data += chunk
                    })
                
                    
                    resp.on('end', () => {
                        try {
                            let responseData = JSON.parse(data)
                            let locationId = responseData.data.AppPresentation_queryAppSearch.sections[1].appSearchCardContent.saveId.id;
                             resolve(locationId)
                            console.log(locationId)
                            
                        } catch (error) {
                            reject(error)
                        }
                     
                    })
    
                    resp.on('error', reject);
                })
                req.on('error',reject);
                req.write(
                    JSON.stringify({query})
                );
                req.end();
    
        })
    }
    
    
    const placesID = await getPlaceId(placeName);
    console.log(`success ${placeName} ,${placesID}`)

  







})


module.exports =route;