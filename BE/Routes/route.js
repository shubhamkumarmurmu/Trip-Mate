const {Router} = require('express')
const route = Router()
const http= require('https')
const fs = require('fs');
// const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const { GoogleGenAI } = require("@google/genai");
const path = require('path');
const dotenv = require('dotenv').config({path: '/home/saidarshan74/Desktop/Tripmate-2.0/.env'})



route.get('/' ,async(requ,res)=>{

    const placeName = requ.body.destination;
    const Begin = requ.body.startDate;
    const noOfDays = requ.body.duration;
   

    //Route to get given placeId from RapidAPI

    const options1 = {
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
    
            const req= http.request(options1, resp => {
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

    //Another Request to rapidAPI to get more info about given Place using given PlaceId
  
     console.log("entering into another attraction list")
    const options2 = {
        method: 'GET',
        hostname: 'travel-advisor.p.rapidapi.com',
        port: null,
        path: `/attractions/list?location_id=${placesID}&currency=USD&lang=en_US&lunit=km&limit=15&sort=recommended`,
        headers: {
            'x-rapidapi-key': process.env.X_RAPID_API_KEY,
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }
    };

    const requests2= http.request(options2,  resp => {
        let data = ''
        resp.on('data', chunk => {
            data += chunk
        })

        resp.on('end', async () => {
            let responseData = await JSON.parse(data).data
          
        let arr = []

        responseData.map((item,index)=>{

            // let i = true;
                       console.log(index) 

            try {

                // if(i){
                // let imageArray = []
                // item.offer_group.offer_list.map((obj)=>{
                // imageArray.push(obj.image_url)})

                arr.push({
                    name: item.name,
                    location: item.location_string,
                     imageUrl:item.photo.images.large.url ,
                    rating: item.rating,
                    moreInfo: item.web_url,
                    longitude:item.longitude,
                    latitude:item.latitude,
                    // moreImages : imageArray
                    })

                //     i=false
                // }
                
            } catch (error) {
                console.log("there is an error")
                
            }

            try {
                 
                let imageArray = []
                item.offer_group.offer_list.map((obj)=>{
                imageArray.push(obj.image_url)})

                if  (item.photo.images.large.url==null){
                    arr[index].imageUrl2=imageArray[1];

                    // arr.push[index]({                     //need to push this into current object
                    //     imageUrl2:imageArray[1]
                    // })
                }
            } catch (error) {
                
            }



           
           
        
        })
        console.log(arr)


    //Google Gemini API to to create Iternerary


    let arr2 = []

    arr.map((item)=>{
       arr2.push({
          name: item.name,
          image: item.imageUrl,
          description:'generate yourself dont keep empty',
          location:item.location,
          moreInfo:item.moreInfo

       })
    })

console.log("entering into Gemini 2.0")
              
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });


    function formatDate(date, offsetDays) {
      const options = { weekday: 'short', day: 'numeric', month: 'short' };
      const currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate() + offsetDays);
      return currentDate.toLocaleDateString('en-US', options);
    }
    
    async function generateItinerary({ places, days, startDate }) {
      let dayDescriptions = "";
    
      for (let i = 0; i < days; i++) {
        const dateFormatted = formatDate(startDate, i);
        dayDescriptions += `\nDay ${i + 1} - ${dateFormatted}\n`;
        dayDescriptions += `Suggest places to visit from the given list.\n\n`;
      }
    
      const prompt = `
    Create a JSON itinerary for a ${days}-day trip starting on ${formatDate(startDate, 0)}.
    
    Places to include:
    ${places.map((place, index) => `
    ${index + 1}. Name: ${place.name}
       Description: ${place.description}
       Location: ${place.location}
       Image URL: ${place.image}
       moreInfo URL: ${place.moreInfo}
    `).join('')}
    
    Itinerary format should be:
    [
      {
        "day": 1,
        "date": "Fri, 18 Apr",
        "activities": [
          {
            "title": "Place name",
            "description": "Short description",
            "duration": "e.g. 120 min",
            "location": "City name",
            "image": "image url",
            "moreInfo":"travel advisor url"
          }
        ]
      }
    ]
    `;
    
      let response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
    
      response = await response.text.replace(/^```(?:json)?\s*/i, "").replace(/```$/, "").trim();
      let data = await response
      return data;
      
    }
    
    console.log("giving data to gemini ")
    
    const places = arr2;
    
    const days = noOfDays;
    const startDate = Begin; // format: YYYY-MM-DD
    
    async function generate(places,days,startDate) {
      const data= await generateItinerary({ places, days, startDate });
    
    return data;
    }
    
    
    let data1 = await generate(places,days,startDate)
          data1= await JSON.parse(data1)
          // console.log(data1)
    
      
          let pointsArray = [];

          arr.map((item) => {
   
           let name = item.name
           let lat = item.latitude
           let lng = item.longitude
   
           pointsArray.push({
             name: name,
             lat: lat,
             lng: lng
           });})

           console.log(data1)
     
           res.json({
              placesData: data1,
              pointsArray: pointsArray
             
          })


  })
 
    
  
})


requests2.end();

})


//route for autocompletion of text

route.get('/autocomplete',(req,res)=>{

    let value= req.query.value;

    const options = {
        method: 'GET',
        hostname: 'wft-geo-db.p.rapidapi.com',
        port: null,
        path: `/v1/geo/places?countryIds=IN&namePrefix=${value}&limit=3`,
        headers: {
            'x-rapidapi-key': process.env.AUTOSUGGESTION_API_KEY,
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    const request = http.request(options,(response)=>{
        let data = ""

        response.on('data',(chunk)=>{
            data += chunk

        })

        response.on('end',async function () {

            let responseData = await JSON.parse(data).data

            console.log(responseData)


    let details =[]
    let result =  responseData.map((data)=>{
                    let name = data.name
                    let region = data.region
                    let country = data.country
    
                    details.push(`${name}, ${region}, ${country}`)
                    // let detailes = ;
                   
                })

                res.json({
                    values:details,
                   

                   })

        })



    })
     
    request.end();

})





//             res.json({
//                 result : arr
//             })

//         })



//     })

//     req.on('error',()=> console.log("there is an error while recieving error"));
//     // req.write(JSON.stringify({query}));
//     req.end();





// })


module.exports =route;