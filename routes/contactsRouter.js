import express from "express";
import validateBody from "../helpers/validateBody.js";
import { contacts } from "../models/contacts.js";
import {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    pdateStatusContact,
} from "../controllers/contactsControllers";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";


const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", updateStatusContact);

export default contactsRouter;