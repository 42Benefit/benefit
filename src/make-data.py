import google.auth
import googleapiclient.discovery
import json
import os
from google.oauth2 import service_account
import re
import urllib.request
import base64

# 환경 변수에서 값을 가져옵니다.
client_email = os.environ.get('CLIENT_EMAIL')
private_key = os.environ.get('PRIVATE_KEY').replace('\\n', '\n')
spreadsheet_id = os.environ.get('SPREADSHEET_ID')
range_name = "benefits_api"

# 딕셔너리 형태로 key_data를 생성합니다.
key_data = {
    'client_email': client_email,
    'private_key': private_key,
    'token_uri': 'https://oauth2.googleapis.com/token',
    'type': 'service_account'
}

# 인증 객체 생성
creds = service_account.Credentials.from_service_account_info(key_data, scopes=['https://www.googleapis.com/auth/drive.readonly'])

# 스프레드시트 서비스 객체 생성
sheets = googleapiclient.discovery.build('sheets', 'v4', credentials=creds)

response = sheets.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=range_name).execute()

# 응답에서 데이터 추출
data = response['values']
keys = ["companyName", "companyDescription", "logo", "category", "content", "method", "startDate", "endDate"]


# print(data)
for values in data[1:]:
    length = len(values)
    for index in range(length):
        values[index] = values[index].replace('\\', '')
        pattern = r'\[\d+\]'
        values[index] = re.sub(pattern, '', values[index])
        if (index == 6 or index == 7):
            continue
        if index == 2:
            values[index] = values[index].replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=").replace("/view?usp=share_link", "").replace("/view?usp=sharing", "")
        pattern = r'\d+\.'
        values[index] = re.sub(pattern, '', values[index]).strip()
        if values[index].count('\n') > 0 and (index == 0 or index == 1):
            values[index] = values[index].replace("\n"," ")
        if values[index].count('\n') > 0 and index != 0:
            values[index] = values[index].split('\n')
            for i in range(len(values[index])):
                values[index][i] = values[index][i].strip()
        
company_data = [dict(zip(keys, values)) for values in data[1:]]

for index, link in enumerate(company_data):
    if "logo" in link and link["logo"]:
        file_path = "src/data/images/" + link["companyName"]
        urllib.request.urlretrieve(link["logo"], file_path) # 링크에서 파일 다운로드
        with open(file_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        company_data[index]["logo"] = "data:image/png;base64," + encoded_string
        
            
            
# JSON 파일에 데이터 저장
# DEBUG시 주석처리
with open('src/data/now.json', 'w', encoding='utf-8') as json_file:
    json.dump(company_data, json_file, ensure_ascii=False, indent=4)

# Local Check 
# with open('./data/now.json', 'w', encoding='utf-8') as json_file:
#     json.dump(company_data, json_file, ensure_ascii=False, indent=4)

