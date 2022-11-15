-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2022 at 12:03 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fooddeliveryapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(10) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `meal_id` int(10) NOT NULL,
  `meal_name` varchar(255) NOT NULL,
  `amount` int(3) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `meal_id`, `meal_name`, `amount`, `price`) VALUES
(15, '2307f1da-8a78-426e-8d68-40c6e6f4f8f1', 1, 'briyani', 1, 22),
(16, '2307f1da-8a78-426e-8d68-40c6e6f4f8f1', 9, 'Muglai', 1, 22),
(17, 'v1', 1, 'briyani', 2, 22),
(18, 'v1', 9, 'Muglai', 1, 22),
(19, 'v1', 11, 'Jalebi', 1, 22),
(20, 'v1', 2, 'briyani', 4, 22),
(22, '6', 2, 'briyani', 8, 22),
(25, '925389', 1, 'briyani', 2, 22),
(26, '4e328740-c3f5-4a5b-b9f2-f3789404f0db', 1, 'briyani', 1, 22),
(27, '4e328740-c3f5-4a5b-b9f2-f3789404f0db', 9, 'Muglai', 1, 22),
(62, '925389', 14, 'Kabab', 1, 5),
(84, 'v6', 1, 'briyani', 1, 22);

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `meal_id` int(10) NOT NULL,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(20,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meals`
--

INSERT INTO `meals` (`meal_id`, `description`, `name`, `price`) VALUES
(1, 'Chicken Delicacy', 'briyani', '22'),
(9, 'Egg Delicacy', 'Muglai', '12'),
(10, 'Chicken Delicacy', 'Muglai', '22'),
(11, 'Sweet Delicacy', 'Jalebi', '22'),
(13, 'Cold', 'Ice Cream', '2'),
(14, 'Paneer', 'Kabab', '5'),
(15, 'Egg', 'Chowmin', '22'),
(16, 'cold', 'Ice Cream', '30');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postalCode` int(10) NOT NULL,
  `totalPrice` int(10) NOT NULL,
  `time` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `address`, `postalCode`, `totalPrice`, `time`, `user_id`) VALUES
(3, '63736a8d4a4e820221115113141', 'Ghraham road kolkata', 700058, 74, '2022-11-15 11:31:41', '462840');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `orderitem_id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` int(10) NOT NULL,
  `meal_id` int(10) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`orderitem_id`, `name`, `amount`, `meal_id`, `order_id`, `price`) VALUES
(5, 'briyani', 1, 1, '63736a8d4a4e820221115113141', 22),
(6, 'Ice Cream', 1, 16, '63736a8d4a4e820221115113141', 30),
(7, 'Chowmin', 1, 15, '63736a8d4a4e820221115113141', 22);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'CUSTOMER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`) VALUES
('462840', 'Souvik', 'souvik@gmail.com', '$2y$10$TIVOmdJ/1./Cj8lmLeiymefgTh/unuGjsyZUErxAuQ0Rw32j/Ler.', 'ADMIN'),
('4bf57bc2-40a6-460b-b068-2d6817b6fffe', 'Souvik', 'souvik5@gmail.com', '$2y$10$ivhxL3HLFKWa.5SgFgNgKePpnF8NqwqqDE1Zppnbq8s4NaMLUIV32', 'CUSTOMER'),
('4e328740-c3f5-4a5b-b9f2-f3789404f0db', 'Smith', 'smith@gmail.com', '$2y$10$5ko0j78Bx5ePJu28tCsOKOuMBZ9CybPOtwwS6Sngfc0WerEu1qP6m', 'CUSTOMER'),
('8dd7f071-4a61-46ab-a8d8-d93b29233bce', 'Smith', 'david2@gmail.com', '$2y$10$YovO2zYec4aADGZ.CZYqMu.9Ikjk5COk0onpdtXIOhzQ/c/kkkpnG', 'CUSTOMER'),
('925389', 'Xavi', 'david@gmail.com', '$2y$10$92FjVloW9rFFU83ftbYrMekvYY48hiBjiVqv1OYOvg0HNTaYP0LYO', 'CUSTOMER'),
('v6', 'Souvik', 'souvikghata7@gmail.com', '$2y$10$XCwv9Hhrf1iL5jKUc6PqVuG1iw27iiOcLpQGV59ps5t/e4Y8tqm0K', 'CUSTOMER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`meal_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`,`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`orderitem_id`),
  ADD KEY `Test` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `meal_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `orderitem_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `Test` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
