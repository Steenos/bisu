"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Dog } from "lucide-react";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #ffc7ed;
  padding: 2rem;
  text-align: center;
  overflow: hidden;
  background-image: url("/bisu-grass.png"), url("/bisu-grass.png"),
    url("/bisu-grass.png");
  background-size: 30%, 30%, 30%; /* Adjust as needed */
  background-position: top left, center center, bottom right; /* Adjust as needed */
  background-repeat: no-repeat, no-repeat, no-repeat; /* Adjust as needed */
`;

const ListContainer = styled.div`
  margin-top: 12px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  list-style: disc inside;
  text-align: left;
  padding-left: 20px; /* Add padding to align bullets */
`;

const Content = styled.div`
  z-index: 1;
  position: relative;
  margin: auto;
  border-radius: 10px;
  border-style: solid;
  border-color: white;
  border-width: 1px;
  border-opacity: 50%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  width: 35%;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const SocialMedia = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 24px;

  &:hover {
    color: #000; /* Change color on hover */
  }
`;

const BisukettoPugPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [treats, setTreats] = useState(0);
  const [isBarking, setIsBarking] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    let timeout: NodeJS.Timeout;

    function setup() {
      clearTimeout(timeout);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      const balls = Array.from({ length: 5 }, () => ({
        x: Math.random() * (width - 50),
        y: Math.random() * (height - 50),
        radius: 25,
        xSpeed: Math.random() < 0.5 ? 3 : -3,
        ySpeed: Math.random() < 0.5 ? 3 : -3,
        draw: function (ctx: CanvasRenderingContext2D) {
          ctx.font = "48px serif";
          ctx.fillText("🍪", this.x, this.y);
          //const img = new Image();
          //img.src = "/biscuit2.png";
          //img.onload = () => ctx.drawImage(img, this.x, this.y, 50, 50); // Adjust the size as needed
        },
        move: function () {
          this.x += this.xSpeed;
          this.y += this.ySpeed;
        },
      }));

      timeout = setInterval(() => {
        context.clearRect(0, 0, width, height);

        balls.forEach((ball) => {
          ball.move();

          if (ball.x + ball.radius >= width) {
            ball.x = width - ball.radius;
            ball.xSpeed = -ball.xSpeed;
          }

          if (ball.x - ball.radius <= 0) {
            ball.x = ball.radius;
            ball.xSpeed = -ball.xSpeed;
          }

          if (ball.y + ball.radius >= height) {
            ball.y = height - ball.radius;
            ball.ySpeed = -ball.ySpeed;
          }

          if (ball.y - ball.radius <= 0) {
            ball.y = ball.radius;
            ball.ySpeed = -ball.ySpeed;
          }

          ball.draw(context);
        });
      }, 10);
    }

    window.onresize = setup;
    setup();

    return () => clearTimeout(timeout);
  }, []);

  const giveTreat = () => {
    setTreats(treats + 1);
  };

  const toggleBarking = () => {
    setIsBarking(!isBarking);
  };

  return (
    <Container>
      <Content>
        <h1 className="text-4xl font-bold mb-4 text-brown-600">
          Bisuketto's Pug Paradise
        </h1>
        <p className="text-xl mb-6">
          Welcome to the goofy world of Bisuketto (ビスケット), the most
          adorable pug!
        </p>
        <div className="mb-8">
          <img
            src="/pug-image.png"
            alt="Cute Pug"
            style={{ width: "200px", borderRadius: "10px" }}
          />
          <p className="text-2xl font-semibold">Woof! I'm Bisuketto!</p>
          <p className="text-lg">My name means "biscuit" in Japanese!</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={giveTreat}
            className="bg-brown-500 text-white px-4 py-2 rounded-full hover:bg-brown-600 transition"
          >
            Give Bisuketto a treat!
          </button>
          <p className="text-xl">Treats received: {treats}</p>
        </div>
        <div className="mt-8">
          <button
            onClick={toggleBarking}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            {isBarking ? "Shh, Bisuketto!" : "Make Bisuketto bark!"}
          </button>
          {isBarking && (
            <p className="text-2xl mt-4 animate-bounce">Woof! Woof! Arf!</p>
          )}
        </div>
        <ListContainer>
          <h2 className="text-2xl font-bold mb-4">
            Bisuketto's Favorite Things
          </h2>
          <List>
            <li>Napping in sunbeams</li>
            <li>Chasing her tail</li>
            <li>Eating treats (obviously!)</li>
            <li>Cuddles with his humans</li>
          </List>
        </ListContainer>
        <SocialMedia>
          <SocialLink href="https://dexscreener.com/moonshot" target="_blank">
            Moonshot
          </SocialLink>
          <SocialLink href="https://twitter.com/bisuketto_sol" target="_blank">
            Twitter
          </SocialLink>
          <SocialLink href="https://t.me/bisukettocoin" target="_blank">
            Telegram
          </SocialLink>
        </SocialMedia>
      </Content>
      <Canvas ref={canvasRef} id="myCanvas"></Canvas>
    </Container>
  );
};

export default BisukettoPugPage;
