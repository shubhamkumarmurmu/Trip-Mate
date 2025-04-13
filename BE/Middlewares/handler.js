const http= require('https')
const path = require('path');
const dotenv = require('dotenv').config({path: '/home/saidarshan74/Desktop/Tripmate-2.0/.env'})



async function locationIdfun(requ,res,next){


    //   try {
        let placeName = requ.body.destination;
        console.log(placeName)
    
      let myarr =placeName.split(",")
      placeName = myarr[0].split(" ")
      placeName =placeName[0]
    
    
      console.log(placeName)
       
        
    //   } catch (error) {
    //     console.log("input error occured")
    //   }
    
        
        
       
    
        //Route to get given placeId from RapidAPI

        try {

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
    
            requ.placesID = placesID
            
          
            
        } catch (error) {
            
            console.log("error occured")
            
        }

        finally{
            next()
        }
    
      
         
        


    

}

module.exports ={ locationIdfun,};