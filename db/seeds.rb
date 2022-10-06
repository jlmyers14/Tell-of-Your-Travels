pp 'Planting user seeds...'

# User.create!(username: 'Justin', password: '12345')

# All country data
all_country_data = JSON.parse(File.read('app/dataset/countries.geojson'))
country_seed_data = []

# Loop because the json doesn't allow for a string key to be used
# loop against an incrementing counter to get to each country
c = 0
while (c < all_country_data['features'].size)
    data = {:name => all_country_data['features'][c]['properties']['ADMIN'], :code => all_country_data['features'][c]['properties']['ADM0_A3']}
    country_seed_data.push(data)
    c += 1
end

# Create seed data for country information in db
pp 'Planting country seeds...'

country_seed_data.each do |data|
    Country.create!(name: "#{data[:name]}", country_code: "#{data[:code]}")
end


pp 'Done seeding!'
