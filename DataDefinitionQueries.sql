/*

    Title: Data Definition Queries for Recipe Project
    Author: Mark Piccirilli
    Assignment: cs340 Project Step 2
    Date: 7/18/18

*/

-- If necessary Drop tables

DROP TABLE IF EXISTS `recipe_ingredients`;
DROP TABLE IF EXISTS `recipe_cookware`;
DROP TABLE IF EXISTS `saved_recipes`;
DROP TABLE IF EXISTS `user_contributor`;
DROP TABLE IF EXISTS `recipes`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `cookware`;
DROP TABLE IF EXISTS `ingredients`;

-- Create the ingrediants table

CREATE TABLE `ingredients` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `serving_size` decimal(19,1) NOT NULL,
    `serving_size_unit` varchar(255),
    `calories` decimal(19,1) NOT NULL,
    `fat_g` decimal(19,1) NOT NULL,
    `sodium_mg` decimal(19,1) NOT NULL,
    `sugar_g` decimal(19,1) NOT NULL,
    `protein_g` decimal(19,1) NOT NULL,
    `vitaminA_pdv` int(11) NOT NULL,
    `vitaminC_pdv` int(11) NOT NULL
)ENGINE=InnoDB;

-- Create the cookware table

CREATE TABLE `cookware` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `cost` DECIMAL(19,4) DEFAULT NULL
)ENGINE=InnoDB;


-- Create the users table

CREATE TABLE `users` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `user_name` varchar(255) NOT NULL,
    `user_password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `cooking_experience` varchar(5000)
)ENGINE=InnoDB;

-- Create the Recipes table

CREATE TABLE `recipes` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `instructions` varchar(8000) NOT NULL,
    `meal_type` varchar(255) DEFAULT NULL,
    `ethnic_cuisine` varchar(255) DEFAULT NULL,
    `low_calorie` int(11) DEFAULT NULL,
    `low_sodium` int(11) DEFAULT NULL,
    `servings` int(11) NOT NULL,
    `contributor` int(11),
    `date_contributed` date NOT NULL,
    FOREIGN KEY (`contributor`)REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB;

-- Create the user contributor table

CREATE TABLE `user_contributor` (
    `follower_id` int(11),
    `contributor_id` int(11),
    PRIMARY KEY (`follower_id`, `contributor_id`),
    FOREIGN KEY (`contributor_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
    FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

-- Create the save recipes table

CREATE TABLE `saved_recipes` (
    `recipe_id` int(11),
    `user_id` int(11),
    PRIMARY KEY (`user_id`, `recipe_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

-- create recipe cookware table

CREATE TABLE `recipe_cookware`(
    `recipe_id` int(11),
    `cookware_id` int(11),
    PRIMARY KEY(`recipe_id`, `cookware_id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON UPDATE CASCADE,
    FOREIGN KEY (`cookware_id`) REFERENCES `cookware` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

-- create recipe ingredients table

CREATE TABLE `recipe_ingredients` (
    `recipe_id` int(11),
    `ingredient_id` int(11),
    `ingredient_quantity` DECIMAL(19,4),
    PRIMARY KEY(`recipe_id`, `ingredient_id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON UPDATE CASCADE,
    FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

-- create recipe comments table

CREATE TABLE `recipe_comments` (
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `recipe_id` int(11),
    `comment_writer_id` int(11),
    `comment_writer` varchar(255),
    `recipe_comment` varchar(5000),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON UPDATE CASCADE,
    FOREIGN KEY (`comment_writer_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;


-- Insert sample Data

-- sample users
INSERT INTO users (first_name, last_name, user_name, user_password, email, cooking_experience) VALUES
('Mark', 'Piccirilli', 'MarkPiccirilli', SHA1('1234'), 'piccirim@oregonstate.edu', 'I love to cook at home!'),
('Leo', 'Greene', 'LeoTheCat', SHA1('ILoveSleeping'), 'LeoCat@gmail.com', NULL),
('Jerome', 'McElroy', 'Chef', SHA1('chef1234'), 'chef@sounthparkelementry.com', 'cooking in the cafiteria at south park!'),
('Spongebob', 'Squarepants', 'spongebob', SHA1('krabbypatties'), 'spongebob@krustykrab.com', 'Fry cook at the krusty krab, home of the krabby patty!!!');

-- sample recipes
INSERT INTO recipes (name, instructions, meal_type, ethnic_cuisine, servings, contributor, date_contributed) VALUES
('chili', 'Add ground beef, kidney beans, onion, and tomato sauce to crock pot and cook on low for 6-8 hrs', NULL, NULL, 3, 3, '2001-7-11'),
('Krabby Patty', 'Its Mr. Krabs sceret recipe', NULL, NULL, 1, 4, '2006-1-1'),
('Lemonade', 'cut lemons and sqeeze into glass, add sugar and ice and water, shake', 'drink', NULL, 2, 1, '2018-7-18');

-- sample ingredients
INSERT INTO ingredients (name, serving_size, serving_size_unit, calories, fat_g, sodium_mg, sugar_g, protein_g, vitaminA_pdv, vitaminC_pdv) VALUES
('ground beef', 1, 'lb', 1506, 136, 304, 0, 65, 0, 0),
('kidney beans', 1, 'cup', 613, 1.5, 44, 4, 43, 0, 13),
('onion', 110, 'grams', 44, 0, 4, 5, 1, 0, 13),
('tomato sauce', 1, 'cup', 70, 0, 27, 10, 3, 21, 28),
('Krabby patty bun', 1, 'bun', 100, 1, 190, 2, 3, 0, 0),
('lemon', 58, 'grams', 17, 0.2, 1, 1.5, .6, 0, 51),
('sugar', 2.3, 'grams', 9, 0, 0, 2.3, 0, 0, 0),
('water', 1, 'cup', 0, 0, 0, 0, 0, 0, 0);

-- sample cookware
INSERT INTO cookware (name, cost) VALUES
('crockpot', 42.50),
('cooking spoon', 5.99),
('spatula', 6.99),
('grill', 159.00),
('drinking glass', 5.50);

-- sample user_contributor
INSERT INTO user_contributor (follower_id, contributor_id) VALUES (2, 1), (1, 2), (1, 4), (4, 3), (4, 2);

-- sample saved_recipes
INSERT INTO saved_recipes (user_id, recipe_id) VALUES (1, 1), (4, 1), (3, 2), (2, 3);

-- sample recipe_cookware
INSERT INTO recipe_cookware (recipe_id, cookware_id) VALUES (1, 1), (1, 2), (2, 3), (2, 4), (3, 5);

-- sample recipe_ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, ingredient_quantity) VALUES (1, 1, .5), (1, 2, .75), (1, 3, 80), (1, 4, 1.5), (2, 5, 1), (2, 1, .25), (3, 6, 116), (3, 7, 20), (3, 8, 2);
