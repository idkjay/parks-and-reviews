# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Park.create(name: "Yellowstone", city: "I dunno", state: "California", zip: "12345", rating: 2, photo: "https://i.imgur.com/XMle8nq.jpg", description: "Wowee what a dope park yo")
Park.create(name: "Denali", city: "Who knows", state: "Alaska", zip: "54321", rating: 4, photo: "https://i.imgur.com/jiusmEy.jpg", description: "Super cold but this place is super neat my guy!!!")


=> #<User id: nil, email: "", username: "", created_at: nil, updated_at: nil, role: "member", profile_photo: nil>
User.create(email: "user@gmail.com", role: "member", profile_photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png")

User.create(email: "admin@gmail.com", role: "admin", profile_photo: "https://www.sloppykisscards.com/images/byo/breeds/other/chinchilla.png")

Vote.create(review_id: 1, user_id: 1, votes: 1)
