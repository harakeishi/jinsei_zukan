json.id        @book.id
json.title     @book.title
json.author    @book.author
json.publisher @book.publisher
json.genre     @book.genre
json.set! :books do
  json.array! @books do |book|
    json.extract! book, :id, :title
  end
end
# 次のコードと同等です。
# json.extract! @book, :id, :title, :author, :publisher, :genre
