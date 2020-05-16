Get all information about all logos from a specific user:

    query getAllLogosFromUser{
        logos(accId: "----INSERT ACCID HERE----:){
            accId
            _id
            text
            image
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

Get one logo using its ID from a specific user:

    query getOneLogoById{
        logo(id:"----INSERT ID HERE----", accId: "----INSERT ACCID HERE----"){
            accId
            _id
            text
            image
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

    mutation AddLogo{
        addLogo(
            text: ["New Logo"],
            image: ["www.fakeurlimage.com"],
            color: "#000000",
            fontSize: 12,
            backgroundColor: "#FFFFFF",
            borderColor: "#000000",
            borderWidth: 12,
            borderRadius: 12,
            padding: 12,
            margin: 12) {
            accId
            _id
        }
    }

Edit an existing logo:

    mutation updateLogo{
            updateLogo(
                accId: "----ACCOUNT ID----",
                id: "----ID OF LOGO TO UPDATE----",
                text: ["NEW TEXT"],
                image: ["www.newurlimage.com"],
                color: "#000000",
                fontSize: 12,
                backgroundColor: "#FFFFFF",
                borderColor: "#000000",
                borderWidth: 12,
                borderRadius: 12,
                padding: 12,
                margin: 12) {
                    lastUpdate
            }
    }

Get all logos with a text from a specific user:

    {
        getLogoByText(text: "----LOGO TEXT FRAGMENT----", accId: "----INSERT ACCID HERE----"){
            accId            
            _id
            text
            image
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
        getLogosByTextContains(text: "----LOGO TEXT FRAGMENT----", accId: "----INSERT ACCID HERE----"){
            accId            
            _id
            text
            image
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

    

