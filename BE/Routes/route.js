const {Router} = require('express')
const route = Router()
const http= require('https')
const fs = require('fs');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const { GoogleGenAI } = require("@google/genai");
const path = require('path');
const dotenv = require('dotenv').config({path: '/home/saidarshan74/Desktop/Tripmate/.env'})

