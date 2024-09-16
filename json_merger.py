import json

def restructure_data(data):
    restructured = {}
    
    for company, devices in data.items():
        restructured[company] = {}
        
        for device, models in devices.items():
            restructured[company][device] = {
                "Llama2": {},
                "Llama3": {}
            }
            
            for model, value in models.items():
                if model.startswith("Llama2"):
                    restructured[company][device]["Llama2"][model] = value
                elif model.startswith("Llama3"):
                    restructured[company][device]["Llama3"][model] = value
    
    return restructured

# Read the original JSON file
with open('transformed_data.json', 'r') as file:
    original_data = json.load(file)

# Restructure the data
restructured_data = restructure_data(original_data)

# Write the restructured data to a new JSON file
with open('restructured_data.json', 'w') as file:
    json.dump(restructured_data, file, indent=4)

print("Restructured data has been saved to 'restructured_data.json'")