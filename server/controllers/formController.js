const express = require('express');
const router = express.Router();
const Form = require('../models/formsModel');
const fs=require('fs');
const path=require('path');


// POST endpoint to handle form submission with file upload
const createForm= async (req, res) => {
  try {
    const { userId, subject, description ,pdf} = req.body;

    // Create a new form instance
    const newForm = new Form({
      userId,
      subject,
      description,
      pdf
    });

    // Save the form to the database
    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
const getPendingProjects=async (req, res) => {
    try {
      // Retrieve the staff member's ID from the request or from the authenticated user
      const staffId = req.user.id; // Assuming staff ID is stored in req.user.id after authentication
  
      // Find forms where the status is 'pending' and the staff member is assigned to handle it
      const formsToHandle = await Form.find({ status: 'pending', handledBy: staffId })
        .populate('userId', 'name') // Populate user details (only name) for each form
        .exec();
  
      res.status(200).json(formsToHandle);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  const forwardForm=async (req, res) => {
    try {
      const formId = req.params.formId;
      const { staffId } = req.body; // Assuming staff ID is provided in the request body
  
      // Find the form by ID
      const form = await Form.findById(formId);
  
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
  
      // Update the 'handledBy' field with the staff ID
      form.handledBy = staffId;
  
      // Save the updated form
      await form.save();
  
      res.status(200).json(form);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
  const downloadForm=async (req, res,next) => {
    const formId=req.params.formId;
    const formFile=Form.findById(formId);
    if(!formFile){
        console.log('file not available')
       res.status(404).json({message:'file is not available'}) 
    }else{
        const formFileName=formFile.pdf;
        const formFilePath=path.join(__dirname,'uploads',formFileName);
        fs.readFile(formFilePath,(err,data)=>{
            if(err){
                console.log(err.message);
                res.status(500).json({message:'error occured while reading the file'})
            }else{
                res.set({
                    'Content-Type': 'application/pdf', // Set content type to PDF
                    'Content-Disposition': `attachment; filename="${formFileName}.pdf"` // Set filename for download
                  });
                res.send(data);
              
            }
        })
    }

  }
  const getAllForms=async (req, res) => {
    try {
      const forms = await Form.find();
      res.json(forms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports={
    createForm,
    getPendingProjects,
    forwardForm,
    downloadForm,
    getAllForms,
    
}