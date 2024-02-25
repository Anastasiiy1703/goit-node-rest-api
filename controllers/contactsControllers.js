import { listContacts, getContactById, addContact, removeContact, updateOneContact } from "../services/contactsServices";
import { HttpError } from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await removeContact(contactId);

    if (!deletedContact) {
      throw HttpError(404);
    }

    res.status(204).json(deletedContact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const bodyIsEmpty = Object.keys(req.body).length === 0;

    if (bodyIsEmpty) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { error } = updateContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const updatedContact = await updateOneContact(contactId, req.body);

    if (!updatedContact) {
      throw HttpError(404);
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact
};
