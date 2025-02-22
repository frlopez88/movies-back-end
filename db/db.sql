-- Create the Movies table
CREATE TABLE Movies (
    MovieID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    ReleaseYear INT NOT NULL,
    Genre VARCHAR(100),
    Duration INT
);

-- Create the Actors table
CREATE TABLE Actors (
    ActorID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    Nationality VARCHAR(100)
);

-- Create the MovieCast table to link Movies and Actors
CREATE TABLE MovieCast (
    MovieID INT REFERENCES Movies(MovieID) ON DELETE CASCADE,
    ActorID INT REFERENCES Actors(ActorID) ON DELETE CASCADE,
    Role VARCHAR(255),
    PRIMARY KEY (MovieID, ActorID)
);

-- Create the Earnings table
CREATE TABLE Earnings (
    EarningsID SERIAL PRIMARY KEY,
    MovieID INT REFERENCES Movies(MovieID) ON DELETE CASCADE,
    Country VARCHAR(100),
    Revenue DECIMAL(15,2)
);


-- Create the Users table 
CREATE TABLE movie_users (
    email varchar(30) primary key,
    name varchar(100),
    lastName varchar(100),
    password varchar(20)
);


select * from movie_users;


select a.earningsid,
        a.country,
       a.movieid, 
       a.revenue , 
       b.title
 from earnings a 
 inner join movies b on b.movieid = a.movieid