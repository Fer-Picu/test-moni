from python:3.11.4

RUN mkdir -p /opt/app/monidjango && cd /opt/app/monidjango
WORKDIR /opt/app/monidjango
COPY monidjango/ .
RUN pip install --force-reinstall --no-cache-dir -r requeriments.txt
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
