const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const Form = require('../models/formsModel');
const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');


const {createForm,getPendingProjects,forwardForm,downloadForm,getAllForms,getPendingProjectsById}=require('../controllers/formController');

router.post('/createform',upload.single('pdf'),createForm);
router.get('/formsToHandle',getPendingProjects);
router.get('/formsToHandle/:staffId',getPendingProjectsById);

router.put('/forward/:formId',forwardForm);
router.get('/download/pdf/:formId', async (req, res) => {
    try {
        const formId = req.params.formId;
        const form = await Form.findById(formId).populate('userId', 'id name role');

        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        const userId = form.userId.id;
        const name = form.userId.name;
        const role = form.userId.role;
        const subject = form.subject;
        const description = form.description || 'No description provided';

        // Create a new PDF document
        const doc = new PDFDocument();

        // Pipe the PDF document directly to the response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${subject}.pdf`);
        doc.pipe(res);

        // Add content to the PDF document
        doc.fontSize(24).text(subject);
        doc.fontSize(12).text(`User ID: ${userId}`);
        doc.fontSize(12).text(`Name: ${name}`);
        doc.fontSize(12).text(`Role: ${role}`);
        doc.fontSize(12).text(`Description: ${description}`);

        // Finalize the PDF document
        doc.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `${err}` });
    }
});
  
router.get('/',getAllForms);




module.exports=router