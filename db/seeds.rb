Faker::Config.locale = :ja
20.times do
  Book.create!(
    title: Faker::Book.title,
    author: Faker::Book.author,
    publisher: Faker::Book.publisher,
    genre: Faker::Book.genre
  )
end
