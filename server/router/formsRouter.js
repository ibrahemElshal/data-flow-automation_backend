const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const Form = require('../models/formsModel');
const puppeteer = require('puppeteer');
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
  
      const htmlContent = `
        <h1>${subject}</h1>
        <p>User ID: ${userId}</p>
        <p>Name: ${name}</p>
        <p>Role: ${role}</p>
        <p>Description: ${description}</p>
      `;
  
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in',
        },
      });
  
      await browser.close();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${subject}.pdf`);
      res.send(pdfBuffer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
router.get('/',getAllForms);




module.exports=router