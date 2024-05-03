const PDFDocument = require('pdfkit');
const FormV2=require('../models/formsModelV2');

const createForm=async (req, res) => {
    try {
      const { formType, description, submittedBy } = req.body;
  
      // Create a new form document
      const form = new FormV2({
        formType,
        description,
        submittedBy,
      });
  
      // Generate PDF file
      const pdfBuffer = await generatePDF(form);
  
      // Save the PDF file data in the form document
      form.pdfFile = pdfBuffer;
  
      // Save the form document
      await form.save();
  
      res.status(201).json(form);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  async function generatePDF(form) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const pdfBuffer = [];
  
      doc.on('data', (data) => {
        pdfBuffer.push(data);
      });
  
      doc.on('end', () => {
        const pdfData = Buffer.concat(pdfBuffer);
        resolve(pdfData);
      });
  
      doc.on('error', (err) => {
        reject(err);
      });
  
      doc.fontSize(14);
      doc.text(`Form Type: ${form.formType}`);
      doc.text(`Description: ${form.description}`);
      doc.text(`Submitted By: ${form.submittedBy}`);
      doc.end();
    });
  }

  const forwardForm=async (req, res) => {
    try {
      const formId = req.params.formId;
      const { staffId } = req.body; // Assuming staff ID is provided in the request body
  
      // Find the form by ID
      const form = await FormV2.findById(formId);
  
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
  const downloadForm=async (req, res) => {
    try {
      const formId = req.params.formId;
  
      // Find the form by ID
      const form = await FormV2.findById(formId);
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
  
      // Check if the form has a PDF file
      if (!form.pdfFile) {
        return res.status(404).json({ error: 'PDF file not found' });
      }
  
      // Set the appropriate response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${form.formType}.pdf`);
  
      // Write the PDF file data to the response
      res.send(form.pdfFile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const deleteForm= async (req, res) => {
    try {
      const formId = req.params.formId;
  
      // Find the form by ID
      const form = await FormV2.findById(formId);
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
  
      // Delete the form
      await FormV2.deleteOne({ _id: formId });
  
      res.json({ message: 'Form deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const assignedForms=async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find forms where the staff member is assigned to handle
      const forms = await FormV2.find({ handledBy: userId, status: 'InProgress' });
  
      res.json(forms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  module.exports={
    createForm,
    forwardForm,
    downloadForm,
    deleteForm,
    assignedForms
  }
  