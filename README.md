## Setup for Google Client ID and Client secret
We are using Google Login for user authentication, you may go to Google APIs "https://console.developers.google.com" and set up your own Client ID and Client secret for Web Application. Make sure you enabled "Google+ API" inside API Library. In "OAuth 2.0 Client", set "Authorized JavaScript origins" to be "http://localhost:3001", and set "Authorized redirect URIs" to be "http://localhost:3001/". Finally, find "authentication.js" in server folder and put your Client ID inside the constant "GOOGLE_ID" and Client secret inside the constant "GOOGLE_SECRET".


## Some useful queries for GraphiQL

Get all information about all logos:

    query getAllLogos{
        logos{
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            lastUpdate
        }
    }

Get one logo using its ID:

    query getOneLogoById{
        logo(id:"----INSERT ID HERE----"){
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            lastUpdate
        }
    }

Create a new logo:

   mutation AddLogo {
   addLogo(
    textArray:[{text:"Logo", color: "ff0000", fontSize: 45,x:0,y:0}],
    backgroundColor: "#500080", 
    borderRadius: 12, 
    borderColor: "#00ff00", 
    borderWidth: 12, 
    width:500,
    height:500,
    padding: 12, 
    margin: 12,
  	imageArray: [{image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
            imageHeight: 200, imageWidth: 200, imageX:0,imageY:0}] ) {
    textArray {
      text
      color
      fontSize
      x
      y
    }
    backgroundColor
    borderRadius
    borderColor
    borderWidth
    padding
    margin
    imageArray {
      image
      imageHeight
      imageWidth
      imageX
      imageY
    }
  }
}


Edit an existing logo:

    mutation updateLogo {
  updateLogo (id: "5ebf0e917278b57a8a5016af", textArray: [{text:"Logo", color: "ff0000", fontSize: 45,x:0,y:0}], 
  backgroundColor: "#500081", 
    borderRadius: 12, 
    borderColor: "#00ff00", 
    borderWidth: 13, 
    width:500,
    height:500,
    padding: 12, 
    margin: 12,
  	imageArray: [{image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
            imageHeight: 200, imageWidth: 200, imageX:0,imageY:0}] ) {
    textArray {
      text
      color
      fontSize
      x
      y
    }
    backgroundColor
    borderRadius
    borderColor
    borderWidth
    width
    height
    padding
    margin
    imageArray {
      image 
      imageHeight
      imageWidth
      imageX
      imageY
    }
  }
}

Get all logos with a text:

    {
        getLogoByText(text: "----LOGO TEXT FRAGMENT----"){
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            lastUpdate
        }
    }

Get a logos with a text that contains:

    {
        getLogosByTextContains(text: "----LOGO TEXT FRAGMENT----"){
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            lastUpdate
        }
    }