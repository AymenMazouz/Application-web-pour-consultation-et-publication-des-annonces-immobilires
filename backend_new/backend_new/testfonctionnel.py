from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select


# important avant d'executer ce test faut s'assurer que le serveur du pour obtenir les wilaya et commune et le serveur back-end et le serveur du front-end sont en march 
# ouvrire le navigateur 
driver = webdriver.Chrome(executable_path="chromedriver.exe")

# acceder au local
driver.get("http://localhost:3000/")
# ajouter le touken pour eciter de faire le log in
driver.execute_script("localStorage.setItem('token', 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3NDA1MmEyYjY0NDg3NDU3NjRlNzJjMzU5MDk3MWQ5MGNmYjU4NWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzU1MjgyMTUsImF1ZCI6IjEwNDk3NDk4MjEzNS00YnRqMTYzZWZyNjE4NWQ4bmJ1azk2Y29wbGtlNmRiNS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMzIwNDg3Mjc5OTMwODE5NTY1MCIsImhkIjoiZXNpLmR6IiwiZW1haWwiOiJrbF9jaGFsYWxAZXNpLmR6IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjEwNDk3NDk4MjEzNS00YnRqMTYzZWZyNjE4NWQ4bmJ1azk2Y29wbGtlNmRiNS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJMeWVzIENIQUxBTCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA3b3FBeGNOcWJQYXpfbFFSTzV6YjB1X3BEMTFTWEc2MmE2QXRsWT1zOTYtYyIsImdpdmVuX25hbWUiOiJMeWVzIiwiZmFtaWx5X25hbWUiOiJDSEFMQUwiLCJpYXQiOjE2NzU1Mjg1MTUsImV4cCI6MTY3NTUzMjExNSwianRpIjoiZTc4YmQwMGM2NDA0M2MzOGRkZDkyOWZkMjUwOGJmNDBkOTQ2ZTRhNSJ9.ZlLidtHNI9c3jyVqEDClpiOC2aohzEuRdOORituzz1LKnnzeayyOyeplpoQhJX3AylM7WMcV2pW_SaOIIPilrKC9TAaLd1jyBQ_WbNo_VjAvw1aUhRUZzlUzxbZgc72IF5x2p75sqB8M7chOHDO7LLtxkTOYTB3AbfYEAYFmN1X0Oq-SfgCm9iiJ1X5lZSlnxG3kyBMdQnSJYhbsX8f-DR0xOWSqx08v_76cFDjZ4O0KZul-6JpUQTWsvhZNNJnkQLDQGcgsnek94QJwNotKiiHyEswGRekpaVz5Yg3n0Mt_vG-CpS_aW3nyChbQA0Ylo7BFDApt5gyiQzfIBbAUGg' )")

time.sleep(1)
# pour acceder a la page de deposer annonces
getstarted_bt = driver.find_element(By.ID, "get_started_bt_test")
getstarted_bt.click()

time.sleep(2)
# pour acceder a la page de deposer annonces
deposer_bt = driver.find_element(By.ID, "deposer_AI_bt_test")
deposer_bt.click()

# remplir les champs de l'annoces
info = driver.find_element(By.ID, "titre_vl_test").send_keys("title 1")
time.sleep(1)
info = driver.find_element(By.ID, "descri_vl_test").send_keys("description test")
time.sleep(1)
select = Select(driver.find_element(By.ID,'type_vl_test')).select_by_visible_text('Bungalow')
time.sleep(1)
select = Select(driver.find_element(By.ID,'cat_vl_test')).select_by_visible_text('vente')
id="prix_vl_test"
time.sleep(1)
info = driver.find_element(By.ID, id).send_keys(1000)
id="surfa_vl_test"
time.sleep(1)
info = driver.find_element(By.ID, id).send_keys(100)
id="address"
time.sleep(1)
info = driver.find_element(By.ID, id).send_keys("Azazga")
id="willaya_vl_test"
time.sleep(1)
select = Select(driver.find_element(By.ID,id)).select_by_visible_text('Tizi Ouzou')
id="commune_vl_test"
time.sleep(1)
select = Select(driver.find_element(By.ID,id)).select_by_visible_text('Azazga')
id="bt_sb_vl_test"
time.sleep(1)

# valider l'envoie
submit = driver.find_element(By.ID, id)
submit.click()


input('Press ENTER to exit')