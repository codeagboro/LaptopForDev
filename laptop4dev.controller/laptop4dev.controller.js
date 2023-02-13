const recipientsRecord = require("../laptop4dev.model/laptop4dev.module");


// endpoint for storing data of recipients of laptops to be given
exports.createRecipients = async (req, res) => {
    try {
    
       const { firstName, lastName, emailAddress, phoneNumber, reasonForLaptop} = req.body;

       // input validation for all fields
       if(!(firstName && lastName && emailAddress && phoneNumber && reasonForLaptop)){
        return res.status(401).json({
            message: "All fields are required"
        });
        }

        const reasonLength = await recipientsRecord.findOne({reasonForLaptop});


        // email and phone number validation
        const emailExists = await recipientsRecord.findOne({emailAddress});
        const phoneNumberExists = await recipientsRecord.findOne({phoneNumber});

        if(emailExists || phoneNumberExists){
            return res.status(404).json({
                message: `Recipient with this data already exists`
            });
        }

        const emailAddressRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validateEmailAddress = (emailAddress) => {
            return emailAddressRegex.test(emailAddress);
        }

        if (!validateEmailAddress(emailAddress)){
            return res.status(401).json({
                message: "Does not match email pattern"
            })
        }
        // phone number length validation
        const phoneNumberRegex = /^\d{11}$/; // regex for 11 digit US phone number
        // function to validate if the number is more than 11 or less than 11
        const validatePhoneNumber = (phoneNumber) => {
         return phoneNumberRegex.test(phoneNumber);
        }

       if (!validatePhoneNumber(phoneNumber)) {
          return res.status(401).json({
            message: "Phone number does not match required length"
          });
        }
       
        // create the recipients
        const addRecipients = await recipientsRecord.create({
            firstName, lastName, emailAddress, phoneNumber, reasonForLaptop
        });
        return res.status(201).json({
        message: "Recipient added successfully",
        addRecipients
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};


// endpoint to get all data
exports.allRecipientsData = async (req, res) => {
   try {
    
    const getAllData = await recipientsRecord.find();

    return res.status(200).json({
        getAllData
    });
   } catch (error) {
    return res.status(500).json({
        error: error.message
    });
   }
}

// endpoint to count all recipients of the laptop
exports.totalRecipients = async (req, res) => {
    try {
        const recipientsCount = await recipientsRecord.estimatedDocumentCount();
        return res.status(200).json({
            message: `The total recipient(s) are ${recipientsCount}`
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

