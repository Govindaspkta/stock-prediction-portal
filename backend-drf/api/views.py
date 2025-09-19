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
# Create your views here.


class StockPredictionAPIView(APIView):
    def post(self,request):
        serializer=StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker=serializer.validated_data['ticker']
            
            #fetch the data from  yfinance
            now=datetime.now()
            start=datetime(now.year-10, now.month,now.day)
            end=nowdf=yf.download(ticker,start,end)
            
            
            return Response({'status ' :'success','ticker':ticker})