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
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
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
            plt.ylabel('Price')
            plt.legend()
            
            #saving the plot to a file
            plot_img_path=f'{ticker}_plot.png'
            plot_img=save_plot(plot_img_path)
            
            #100 days moving average
            ma100=df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='closing Price')
            plt.plot(ma100, 'r' ,label='100 DMA')
            plt.title(f'100 days moving avg of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path=f'{ticker}_100_dma.png'
            plot_100_dma=save_plot(plot_img_path)
            
            #200 days moving average
            ma200=df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='closing Price')
            plt.plot(ma100, 'r' ,label='100 DMA')
            plt.plot(ma200, 'g' ,label='200 DMA')
            plt.title(f'200 days moving avg of  {ticker}')
            plt.xlabel('Days')
            plt.ylabel(' Price')
            plt.legend()
            plot_img_path=f'{ticker}_200_dma.png'
            plot_200_dma=save_plot(plot_img_path)
            
            #splitting data into training & testing datasets
            data_training=pd.DataFrame(df.Close[0:int(len(df) * 0.7)])
            data_testing=pd.DataFrame(df.Close[int(len(df) * 0.7):int (len(df))])
 
            #SCALING data btn 0 and 1
            scaler= MinMaxScaler(feature_range=(0,1))
            
            #loading ml model
            model=load_model('stock_prediction_model.keras')
            
            #Preparing test data
            past_100_days=data_training.tail(100)
            final_df=pd.concat([past_100_days,data_testing],ignore_index=True)
            input_data=scaler.fit_transform(final_df)
            
            x_test= []
            y_test= []
            for i in range(100,input_data.shape[0]):
                x_test.append(input_data[i-100 :i ])
                y_test.append(input_data[i,0])
            x_test,y_test=np.array(x_test), np.array(y_test)  
                
            #making predictions
            y_predicted=model.predict(x_test)         
            
            #revert the scaled price to original prices
            y_predicted=scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test=scaler.inverse_transform(y_test.reshape(-1,1).flatten())
            
            print('y_predicted => ',y_predicted)
            print('y_test =>',y_test )
            
            #plot the final predictions
            
                         
            return Response({'status ' :'success',
                             'plot_img':plot_img,
                             'plot_100_dma':plot_100_dma,
                             'plot_200_dma':plot_200_dma})