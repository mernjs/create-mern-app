export const dataset = [
    {
        "Sender": "Alice",
        "Receiver": "Bob",
        "Timestamp": "2023-10-01 09:00:00",
        "Message": "Hey Bob! Are we still on for the meeting?",
        "Context": "Meeting schedule confirmation",
        "Topics": ["meeting", "schedule"],
        "MessageType": "Question",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Alice",
        "Timestamp": "2023-10-01 09:01:00",
        "Message": "Yes, see you at 10!",
        "Context": "Meeting time confirmation",
        "Topics": ["meeting", "time", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-01 09:05:00",
        "Message": "Hey Charlie, do you want to join the meeting?",
        "Context": "Meeting invitation",
        "Topics": ["meeting", "invitation"],
        "MessageType": "Invitation",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Alice",
        "Timestamp": "2023-10-01 09:06:00",
        "Message": "Sure, I’ll be there!",
        "Context": "Meeting confirmation",
        "Topics": ["meeting", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-01 09:15:00",
        "Message": "Can someone share the meeting link?",
        "Context": "Meeting logistics",
        "Topics": ["meeting", "link"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Group",
        "Timestamp": "2023-10-01 09:16:00",
        "Message": "I’ll send it right now!",
        "Context": "Meeting logistics",
        "Topics": ["meeting", "link"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Bob",
        "Timestamp": "2023-10-02 09:15:00",
        "Message": "Bob, can you share the agenda for today's meeting?",
        "Context": "Agenda request",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Alice",
        "Timestamp": "2023-10-02 09:16:00",
        "Message": "Sure! I'll send it over shortly.",
        "Context": "Agenda confirmation",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Alice",
        "Timestamp": "2023-10-02 09:20:00",
        "Message": "What time is the meeting today?",
        "Context": "Meeting time inquiry",
        "Topics": ["meeting", "time"],
        "MessageType": "Question",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-02 09:21:00",
        "Message": "It's at 10 AM. Looking forward to seeing you there!",
        "Context": "Meeting time confirmation",
        "Topics": ["meeting", "time", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:30:00",
        "Message": "Can we have a quick call to discuss the project updates?",
        "Context": "Project update discussion",
        "Topics": ["project", "meeting", "updates"],
        "MessageType": "Request",
        "Priority": "High"
    },
    {
        "Sender": "Eve",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:31:00",
        "Message": "I’m available. How about 2 PM?",
        "Context": "Meeting time suggestion",
        "Topics": ["meeting", "time"],
        "MessageType": "Suggestion",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:32:00",
        "Message": "2 PM works for me. Let's confirm with others.",
        "Context": "Meeting time confirmation",
        "Topics": ["meeting", "time", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:35:00",
        "Message": "I'm in! Count me in for 2 PM.",
        "Context": "Meeting confirmation",
        "Topics": ["meeting", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:36:00",
        "Message": "I can join too. Looking forward to it!",
        "Context": "Meeting confirmation",
        "Topics": ["meeting", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:37:00",
        "Message": "I'll be there as well! See you at 2 PM.",
        "Context": "Meeting confirmation",
        "Topics": ["meeting", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Eve",
        "Receiver": "Alice",
        "Timestamp": "2023-10-03 09:00:00",
        "Message": "Alice, can we discuss the budget during today's meeting?",
        "Context": "Budget discussion",
        "Topics": ["budget", "meeting"],
        "MessageType": "Request",
        "Priority": "High"
    },
    {
        "Sender": "Alice",
        "Receiver": "Eve",
        "Timestamp": "2023-10-03 09:01:00",
        "Message": "Absolutely! I’ll add it to the agenda.",
        "Context": "Agenda update",
        "Topics": ["budget", "agenda"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-03 09:15:00",
        "Message": "Reminder: Today's meeting is at 2 PM.",
        "Context": "Meeting reminder",
        "Topics": ["meeting", "reminder"],
        "MessageType": "Notification",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Bob",
        "Timestamp": "2023-10-03 09:20:00",
        "Message": "Bob, do you have the latest sales figures for the meeting?",
        "Context": "Sales figures inquiry",
        "Topics": ["sales", "meeting"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-03 09:21:00",
        "Message": "Yes, I’ll pull them up before the meeting.",
        "Context": "Sales figures confirmation",
        "Topics": ["sales", "meeting"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Eve",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:00:00",
        "Message": "Can we set a follow-up meeting for next week?",
        "Context": "Follow-up meeting request",
        "Topics": ["meeting", "follow-up"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:01:00",
        "Message": "How about Tuesday at 3 PM?",
        "Context": "Follow-up meeting suggestion",
        "Topics": ["meeting", "follow-up", "time"],
        "MessageType": "Suggestion",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:02:00",
        "Message": "Tuesday at 3 PM works for me.",
        "Context": "Follow-up meeting confirmation",
        "Topics": ["meeting", "follow-up", "time"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:03:00",
        "Message": "I'm available then as well.",
        "Context": "Follow-up meeting confirmation",
        "Topics": ["meeting", "follow-up", "time"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:04:00",
        "Message": "Count me in for Tuesday too!",
        "Context": "Follow-up meeting confirmation",
        "Topics": ["meeting", "follow-up", "time"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Bob",
        "Timestamp": "2023-10-05 09:00:00",
        "Message": "Do you think we need more participants for the follow-up meeting?",
        "Context": "Meeting participants inquiry",
        "Topics": ["meeting", "participants"],
        "MessageType": "Question",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Alice",
        "Timestamp": "2023-10-05 09:01:00",
        "Message": "Possibly, let's discuss it before we finalize.",
        "Context": "Meeting participants discussion",
        "Topics": ["meeting", "participants"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-05 09:15:00",
        "Message": "Please prepare your updates for the follow-up meeting.",
        "Context": "Meeting preparation",
        "Topics": ["meeting", "preparation"],
        "MessageType": "Notification",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Alice",
        "Timestamp": "2023-10-06 09:00:00",
        "Message": "Alice, can you remind me of the key points from our last meeting?",
        "Context": "Meeting recap request",
        "Topics": ["meeting", "recap"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-06 09:01:00",
        "Message": "Sure! I'll summarize and send it to you.",
        "Context": "Meeting recap confirmation",
        "Topics": ["meeting", "recap"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Eve",
        "Receiver": "Group",
        "Timestamp": "2023-10-06 09:30:00",
        "Message": "Looking forward to our meeting next week! Let's finalize the agenda.",
        "Context": "Agenda finalization",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Notification",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-06 09:31:00",
        "Message": "I have some points to add for the agenda.",
        "Context": "Agenda input",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Group",
        "Timestamp": "2023-10-06 09:32:00",
        "Message": "Feel free to share your points, David!",
        "Context": "Agenda encouragement",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Response",
        "Priority": "Normal"
    }
];
