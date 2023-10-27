const express = require("express")
const router = express.Router()

const { getContacts,
    getContact,
    deleteContact,
    createContact,
    updateContacts } = require('../controllers/contactController')

    const validateToken = require("../middleware/validateTokenHandler");

    router.use(validateToken);

router.route("/").get(getContacts).post(createContact)

router.route("/:id").get(getContact).put(updateContacts).delete(deleteContact)




module.exports = router;