const {
  openBrowser,
  goto,
  write,
  click,
  closeBrowser,
  into,
  below,
  textBox,
  button,
  waitFor,
  clear,
} = require("taiko");

(async () => {
  var testNum = 0;
  try {
    await openBrowser();

    await LoginTest(
      testNum,
      "Check web applicaiton localhost accessibility and login the taiko test account:",
    );
    testNum = updateTestNum(testNum);
    await waitFor(5000);

    // check all links are functional
    await routingTest(
      testNum,
      "Check Routing functionalities, all routes should be accessible and test end up at personal setting page:",
    );
    testNum = updateTestNum(testNum);
    await waitFor(5000);

    // testing update personal information
    await personInfoTest(
      testNum,
      "Updating personal information, check all buttons and input field are working properly:",
    );
    testNum = updateTestNum(testNum);
    await waitFor(5000);
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {}, 30000);
    // closeBrowser();
  }
})();

const routingTest = async (testNum, description) => {
  console.log(`Test[${testNum}]: ${description}`);
  await goto("localhost:3000/contact");
  await goto("localhost:3000/record");
  await goto("localhost:3000/map");
  await goto("localhost:3000/setting");
};

const personInfoTest = async (testNum, description) => {
  console.log(`Test[${testNum}]: ${description}`);
  await click(button({ id: "edit-button" }));

  // update basic information
  await clear(textBox(below("First Name")));
  await write("Team4399", into(textBox(below("First Name"))));

  await clear(textBox(below("Last Name")));
  await write(
    `TaikoTest ${new Date().toISOString()}`,
    into(textBox(below("Last Name"))),
  );

  await clear(textBox(below("Occupation")));
  await write("Taiko Testing", into(textBox(below("Occupation"))));

  // delete existing phone number
  await click(button({ id: "phone-delete-btn" }));
  await click(button("ADD PHONE"));
  await write("0443994399", into(textBox(below("Phone"))));

  await click(button({ id: "email-delete-btn" }));
  await click(button("ADD EMAIL"));
  await write("taiko@test.4399.com", into(textBox(below("Email"))));

  await click(button("SAVE CHANGE"));
};

const LoginTest = async (testNum, description) => {
  console.log(`Test[${testNum}]: ${description}`);
  await goto("localhost:3000");

  // write taiko test username
  await write("taiko_test_account", into(textBox(below("Username"))));

  // write taiko test password
  await write("TaikoTest4399", into(textBox(below("Password"))));

  // click the login button
  await click("LOGIN");
};

const updateTestNum = (testNum) => {
  return testNum + 1;
};
