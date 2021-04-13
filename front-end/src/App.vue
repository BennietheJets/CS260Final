<template>
  <div id="app">
    <header id="header">
      <h1>AppTrack</h1>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
      <nav>
        <router-link to="/dashboard">My Apps</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<style>

body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 120px 200px;
}

#header {
  margin: -9em 1em 1em 0;
  height: 100px;
  width: 200px;
  position: fixed;
  z-index: 10000;
  transform: translate(-50%, 0);
  background: #2066fcb7;
  text-align: center;
  box-shadow: 0 0 0 1em #FFF;
}

nav {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

h1 {
  color: #fff;
  font-size: 18px;
}

footer
{
	text-align: center;
	height: 25px;
	width: 100%;
	color: #ffffff;
	background: #000000;
	position: fixed;
	left: 0;
	bottom: 0;
}

h2 {
  font-size: 12px;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

.pure-button-primary {
  background-color: #34a8bdd2;
}
</style>
