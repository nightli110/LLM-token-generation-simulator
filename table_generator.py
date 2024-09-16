from jinja2 import Template
import json

# Load your data
with open('transformed_data.json', 'r') as f:
    data = json.load(f)

# Create a template for each table
table_template = Template("""
<h3>{{ brand }} {{ benchmark_type }} Benchmarks</h3>
<div class='table-responsive'>
    <table class='table table-striped table-bordered table-hover'>
        <thead>
            <tr>
                <th>Device</th>
                {% for model in models %}
                <th>{{ model }}</th>
                {% endfor %}
            </tr>
        </thead>
        <tbody>
            {% for device, benchmarks in devices.items() %}
            <tr>
                <td>{{ device }}</td>
                {% for model in models %}
                <td>
                    {{ benchmarks.get(model + '_' + benchmark_type, 'None') }}
                </td>
                {% endfor %}
            </tr>
            {% endfor %}
        </tbody>
    </table>
</div>
""")

# Function to get unique models for a brand and benchmark type
def get_models(brand_data, benchmark_type):
    models = set()
    for device_data in brand_data.values():
        for key in device_data.keys():
            if key.endswith('_' + benchmark_type):
                models.add(key.rsplit('_', 1)[0])
    return sorted(list(models))

# Generate tables
tables = []
for brand, brand_data in data.items():
    for benchmark_type in ['Processing', 'Generation']:
        models = get_models(brand_data, benchmark_type)
        table = table_template.render(
            brand=brand,
            benchmark_type=benchmark_type,
            devices=brand_data,
            models=models
        )
        tables.append(table)

# Write the tables to an HTML file
with open('table.html', 'w') as f:
    f.write("<h2>AI Model Benchmarks</h2>\n")
    f.write("\n".join(tables))

print("Table generation complete. Check table.html for the results.")