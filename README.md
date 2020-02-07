# Setup
To run this app locally, run the following commands in order:

1. yarn install
2. bundle exec bundle install
3. bundle exec rake db:create
4. bundle exec rake db:migrate && bundle exec rake db:rollback && bundle exec rake db:migrate
5. bundle exec rake db:seed
6. yarn run start (to run the React front end)
7. in a new tab run: bundle exec rails s (for the Rails back end)
8. navigate your browser to localhost:3000

# Name
Parks and Reviews

# Technologies
Ruby: 2.6.3, Rails: 5.2.3, React, CarrierWave, Foundation, Fog-AWS

# Description
National Parks review site. Users can submit reviews of national parks they have been to and can also see reviews of other users.

# Authors
Jordan Chu, Ben Hatfield, Hannah Horobin, Robert Huff, and Afia Kyalo
