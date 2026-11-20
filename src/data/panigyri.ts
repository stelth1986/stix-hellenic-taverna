/* Christmas Panigyri, Sunday 13 December 2026. Details come from the event
   flyer. Everything the page and the site-wide pop-up say lives here. */
export const PANIGYRI = {
  path: "/panigyri",
  name: "Christmas Panigyri",
  tagline: "A Greek village Christmas comes to Tempe",
  dateLong: "Sunday 13 December",
  dateShort: "Sun 13 Dec",
  time: "12pm til late",
  entry: "Free entry",
  venue: "Riverview Hotel, 900 Princes Highway, Tempe",
  // Sydney is UTC+11 in December.
  startIso: "2026-12-13T12:00:00+11:00",
  // The pop-up stops showing once the day is over.
  popupUntilIso: "2026-12-14T00:00:00+11:00",
  flyer: "./images/panigyri-flyer.jpg",
  highlights: [
    {
      title: "Spits all day",
      image: "./images/panigyri-spit.jpg",
      alt: "Meat turning on the spit over charcoal",
      desc: "The spits go on early and turn over the charcoal right through the day.",
    },
    {
      title: "Live bouzouki",
      image: "./images/panigyri-bouzouki.jpg",
      alt: "A bouzouki being played",
      desc: "Live Greek music in the courtyard, the way a village festival should sound.",
    },
    {
      title: "Santa & his elves",
      image: "./images/panigyri-courtyard.jpg",
      alt: "Families in the Riverview Hotel courtyard, decorated for Christmas",
      desc: "Bring the kids. Santa and his elves are dropping in to say hello.",
    },
  ],
  // 12pm to 11pm Sydney time, written in UTC for Google Calendar.
  calendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=Christmas+Panigyri+at+Stix+Hellenic+Taverna" +
    "&dates=20261213T010000Z/20261213T120000Z" +
    "&details=Spits+all+day%2C+live+bouzouki%2C+Santa+and+his+elves.+Free+entry.+https%3A%2F%2Fwww.stixtaverna.com.au%2Fpanigyri" +
    "&location=Riverview+Hotel%2C+900+Princes+Hwy%2C+Tempe+NSW+2044",
};

/** True until the end of the event day. */
export function panigyriIsUpcoming(now: Date = new Date()) {
  return now.getTime() < new Date(PANIGYRI.popupUntilIso).getTime();
}
