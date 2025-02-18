window.onload = async function () {
  try {
    const session = await startARSession();
    function animate(time, frame) {
      session.requestAnimationFrame(animate);
    }

    session.requestAnimationFrame(animate);
  } catch (error) {
    alert(error.message);
  }
};

async function startARSession() {
  if (!AR.isSupported()) {
    throw new Error(
      "This device is not compatible with this AR experience.\n\n" +
        "User agent: " +
        navigator.userAgent
    );
  }

  const tracker = AR.Tracker.Image();
  await tracker.database.add([
    {
      name: "my-reference-image",
      image: document.getElementById("my-reference-image"),
    },
  ]);

  const viewport = AR.Viewport({
    container: document.getElementById("ar-viewport"),
    hudContainer: document.getElementById("ar-hud"),
  });

  //   const video = document.getElementById("my-video");
  //   const source = AR.Source.Video(video);

  const source = AR.Source.Camera();

  const session = await AR.startSession({
    mode: "immersive",
    viewport: viewport,
    trackers: [tracker],
    sources: [source],
    stats: true,
    gizmos: true,
  });

  const scan = document.getElementById("scan");

  tracker.addEventListener("targetfound", (event) => {
    console.log("found");
    scan.hidden = true;
  });

  tracker.addEventListener("targetlost", (event) => {
    console.log("lost");
    scan.hidden = false;
  });

  return session;
}
