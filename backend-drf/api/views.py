from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response
import pandas as pd 
import numpy as np 
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime
import os
from django.conf import settings
# Create your views here.


class StockPredictionAPIView(APIView):
    def get(self,request):
        return Response({'message':'Protected view is working'})
    def post(self,request):
        serializer=StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker=serializer.validated_data['ticker']
            
            #fetch the data from  yfinance
            now=datetime.now()
            start=datetime(now.year-10, now.month,now.day)
            end=now
            df=yf.download(ticker,start,end)
            print(df)
            if df.empty:
                return Response(
                    {'error': 'No data found fro the given ticker'},
                                        status =status.HTTP_404_NOT_FOUND)
            df=df.reset_index()
            print(df)
            #generate basic plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='closing Price')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            
            #saving the plot to a file
            plot_img_path=f'{ticker}_plot.png'
            image_path=os.path.join(settings.MEDIA_ROOT,plot_img_path)
            plt.savefig(image_path)
            plt.close()
            
            plot_img=settings.MEDIA_URL + plot_img_path
            print(plot_img)
            
            return Response({'status ' :'success',
                             'plot_img':plot_img})