const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const Form = require('../models/formsModel');
const pdf = require('html-pdf');
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
        return res.status(404).json({ message: 'Form not found' });
      }
  
      const userId = form.userId.id;
      const name = form.userId.name;
      const role = form.userId.role;
      const subject = form.subject;
      const description = form.description;
  
      const htmlContent = `
        <h1>${subject}</h1>
        <p>User ID: ${userId}</p>
        <p>Name: ${name}</p>
        <p>Role: ${role}</p>
        <p>Description: ${description}</p>
      `;
  
      const options = {
        format: 'A4',
        border: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in',
        },
      };
  
      pdf.create(htmlContent, options).toStream((err, stream) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: `${err}` });
        }
  
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=form.pdf');
  
        stream.pipe(res);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
router.get('/',getAllForms);




module.exports=router