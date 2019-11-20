# MAIS202_FINAL

Here is the repository for my MAIS202 Final Project.
This project consists of classifying financial news articles in order to determine if stock prices will go up or down on average.

I decided to focus on Apple and Goldman Sach stocks due to my limited sample size for news articles related to those companies.

You can find in the Data folder my jupyter notebook file where you can see the steps in finding my results. 

## Stock Predictor

In the stockPredictor folder, you will find the source code for the front-end of my web-app for this project. When cloning, don't forget to write "npm install" in your console to download all of the dependencies. 

The web app allows users to visualize their potential profits by using an active or passive form of investing. Passive as in keeping a long position for X amount of periods and active as in using my machine learning model to constantly change holding positions.

## Server

In the server folder, you will see a news.csv.zip file. Unzip the file for that the server script can run properly.
The server sends data to the front-end for it to be displayed in a user friendly manner.
