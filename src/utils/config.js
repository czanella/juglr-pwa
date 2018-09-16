const config = {
    gravity: 600,
    ballRadius: 10,
    hitAreaRadius: 100,
    newBallInterval: 5000,
    firstBallInterval: 5000,
    maxInitialSpeedX: 300,
    tapImpulse: [600, 900],
    tapAngle: [60, 120],
    ballColors: [
        ['rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.5)'],
        ['rgb(0, 255, 0)', 'rgba(0, 255, 0, 0.5)'],
        ['rgb(0, 0, 255)', 'rgba(0, 0, 255, 0.5)'],
        ['rgb(255, 255, 0)', 'rgba(255, 255, 0, 0.5)'],
        ['rgb(255, 0, 255)', 'rgba(255, 0, 255, 0.5)'],
        ['rgb(0, 255, 255)', 'rgba(0, 255, 255, 0.5)'],
    ],
    trailLength: 20,
    backgroundColor: '#000000',
};

export default config;
