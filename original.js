/* 
For information about LADDI, please visit laddi.io or reach out to matt@matthewbibby.com
An Execute JavaScript trigger needs to be added to Storyline that runs whenever you want to send data to the database. It should contain this code:

    player = GetPlayer();
    laddiPost();

Then, the index_lms.html file needs to be edited to include these scripts before the closing </html> tag:

      <!-- START LADDI  -->
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/MatthewBibby/laddi-d0bafcca60786ef8968e21226151fb68@0.1/laddi-d0bafcca60786ef8968e21226151fb68-1c8dbddf9165922df29773c7b440a7e2322ca22d41cf3d53affdfc48a1e453f1.js"></script>
      <!-- END LADDI -->  

    */

function laddiPost() {        
    // Grab username from LMS SCORM 2004 (text)
         if (!window.gotName) {
            function findLMSAPI(win) {
                if (win.hasOwnProperty("GetStudentID")) return win;
                else if (win.parent == win) return null;
                else return findLMSAPI(win.parent);
            }
            const lmsAPI = findLMSAPI(this);
            let name = lmsAPI.SCORM2004_GetStudentName();
            let nameArray = name.split(',');
            let firstName = nameArray[1];
            let lastName = nameArray[0];
            let fullName = firstName + ' ' + lastName;
            window.player.SetVar("nameLMS", fullName);
            window.gotName = true;
        }

    // Grab date (text)
    let date = new Date();

    // Grab name LMS (text)
    let nameLMS = window.player.GetVar("nameLMS");

    // Grab name course (text)
    let nameEntry = window.player.GetVar("Name");

    // Overall progress (num)
    let progressOverall = window.player.GetVar("1_7_Progress_Overall");

    // Intro to Packaging progress (num)
    let progressIntro = window.player.GetVar("1_7_Progress_Intro_to_Packaging");

    // Filling progress (num)
    let progressFilling = window.player.GetVar("1_7_Progress_Filling");

    // Labelling progress (num)
    let progressLabelling = window.player.GetVar("1_7_Progress_Labelling");

    // Packing progress (num)
    let progressPacking = window.player.GetVar("1_7_Progress_Packing");

    // Operational Standards progress (num)
    let progressOperational = window.player.GetVar("1_7_Progress_Operational_Standards");

    // Workbook progress (num)
    let progressWorkbook = window.player.GetVar("1_7_Progress_Workbook");

    // Introduction to the SCOS progress (num)
    let progressSCOS = window.player.GetVar("1_7_Progress_Introduction_to_SCOS");

    // Effective Problem Solving progress (num)
    let progressEffective = window.player.GetVar("1_7_Progress_Effective_Problem_Solving");

    // Packaging Quality Overview progress (num)
    let progressPackaging = window.player.GetVar("1_7_Progress_Packaging_Quality_Overview");

    // Previous Learning Fundamentals (T/F)
    let previousFundamentals = window.player.GetVar("1_5_Previous_Learning_Fundamentals_False");

    // Previous Learning Filling (T/F)
    let previousFilling = window.player.GetVar("1_5_Previous_Learning_Filling_False");

    // Previous Learning Labelling (T/F)
    let previousLabelling = window.player.GetVar("1_5_Previous_Learning_Labelling_False");

    // Previous Learning Packing (T/F)
    let previousPacking = window.player.GetVar("1_5_Previous_Learning_Packing_False");

    // Role - Bottle Line Filler Operator (T/F)
    let roleBottle = window.player.GetVar("1_4_Role_New_Bottle_Line_Filler_Operator");

    // Role - Can Line Filler Operator (T/F)
    let roleCan = window.player.GetVar("1_4_Role_New_Can_Line_Filler_Operator");

    // Role – Keg Line Operator (T/F)
    let roleKeg = window.player.GetVar("1_4_Role_New_Keg_Line_Operator");

    // Role – Labeller Operator (T/F)
    let roleLabeller = window.player.GetVar("1_4_Role_New_Labeller_Operator");

    // Role – Packer Operator (T/F)
    let rolePacker = window.player.GetVar("1_4_Role_New_Packer_Operator");

    // Role – Trade and Team Leader (T/F)
    let roleTrade = window.player.GetVar("1_4_Role_New_Trade_TeamLeader");

    // Axios post 
    axios({
            method: "POST",
            url: "https://laddi.app/user",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            data: {
                clientId: "1c8dbddf9165922df29773c7b440a7e2322ca22d41cf3d53affdfc48a1e453f1",
                courseName: "Packaging Gold Fundamentals",
                date: date,
                nameLMS: nameLMS,
                nameEntry: nameEntry,
                progressOverall: progressOverall,
                progressIntro: progressIntro,
                progressFilling: progressFilling,
                progressLabelling: progressLabelling,
                progressPacking: progressPacking,
                progressOperational: progressOperational,
                progressWorkbook: progressWorkbook,
                progressSCOS: progressSCOS,
                progressEffective: progressEffective,
                progressPackaging: progressPackaging,
                previousFundamentals: previousFundamentals,
                previousFilling: previousFilling,
                previousLabelling: previousLabelling,
                previousPacking: previousPacking,
                roleBottle: roleBottle,
                roleCan: roleCan,
                roleKeg: roleKeg,
                roleLabeller: roleLabeller,
                rolePacker: rolePacker,
                roleTrade: roleTrade
            },
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
}