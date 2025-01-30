import React from 'react';

const HelpPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 py-14">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">Help Center</h1>

      <p className="text-sm md:text-base lg:text-lg mb-8">
        Welcome to the Mentora Help Center. Here you can find answers to frequently asked questions and learn more about how to use the platform effectively.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-base md:text-lg lg:text-xl font-medium">Frequently Asked Questions</h2>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">1. What is Mentora?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            Mentora is a platform that connects mentors and mentees, facilitating knowledge sharing and personal development. Mentors provide guidance, expertise, and support to mentees who are looking to grow in various fields of study or careers. Whether you are looking to enhance your skills or seeking expert advice, Mentora makes it easy to find the right mentor and schedule meetings for personalized learning.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">2. Is Mentora free to use?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            Yes, Mentora is completely free to use! All users can access the platform's features, find mentors, book meetings, and update profiles at no cost.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">3. How do I update my profile?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            To update your profile, simply log in to your account and navigate to the "Profile" section. Here, you can modify your personal information, upload or change your profile picture, update your bio, and make other necessary edits.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">4. How do I change my email address?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            Currently, email addresses cannot be changed. If you need to update your email, you will need to create a new account using your preferred email address.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">5. Can I add or change my education details?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            While you cannot change your existing education information, you can add new education details to keep your profile updated. You can include your latest qualifications or courses in the "Education" section of your profile.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">6. How can I delete my account?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            You can delete your account directly from the "Profile" section. Please note that account deletion is **irreversible**, and all your data will be permanently removed from the platform.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">7. How do I find a mentor?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            To find a mentor, go to the "Find a Mentor" section. Browse through available mentors based on their expertise or search by specific skills or name. Once you find a mentor that matches your needs, send a request to schedule a meeting.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">8. How do I book a meeting with a mentor?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            In the "Find a Mentor" section, send a meeting request to your chosen mentor. Once the mentor approves the request, you’ll receive a confirmation and can proceed to your meeting.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">9. Can I request a specific mentor for my needs?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            Yes, you can search for mentors based on their areas of expertise and request a meeting with a specific mentor who best fits your requirements.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">10. What should I do if my mentor is unavailable?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            If your mentor is unavailable at the moment, you can either try scheduling a meeting at a later time or look for another mentor in the same area of expertise.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">11. Can I change or cancel my meeting with a mentor?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            You can cancel your meeting at any time. However, once a meeting is canceled, you will not be able to reschedule it through the platform.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">12. How do I start a meeting?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            At the scheduled time, navigate to your "Meetings" section, where you’ll find a button to start the meeting with your mentor or mentee.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">13. What happens if I miss a meeting?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            If you miss a meeting, it will still be marked as completed. Unfortunately, no further action can be taken for missed meetings.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">14. Can I record my meetings?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            We use external platforms for hosting meetings, and whether or not you can record depends on the platform. Please refer to the meeting platform’s policies for recording options.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">15. How do I know if my meeting has been confirmed?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            Once your mentor confirms your meeting, you’ll receive a notification along with the meeting details, including the time and link to join.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">16. How is my personal data protected?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            We prioritize the security of your personal information. We use industry-standard encryption to ensure your data and transactions are kept safe. For more details, please review our **Privacy Policy**.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">17. Do you share my personal information with third parties?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            No, your personal information will never be shared with third parties without your explicit consent. For more details, please refer to our **Privacy Policy**.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">18. How can I report suspicious activity or a security concern?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            If you suspect any security-related issues, please immediately contact our support team through the "Contact Us" page or send an email to <strong>**support@mentora.com**</strong>. We will look into the matter promptly.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">19. I’m having trouble logging in. What should I do?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            If you're unable to log in, please contact us through our support email <strong>**support@mentora.com**</strong>, and we’ll assist you in resolving the issue.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">20. The website is loading slowly. How can I fix this?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            If you're experiencing slow loading times, try refreshing the page, clearing your browser cache, or switching to a different browser. If the problem persists, please contact our support team for further assistance.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">21. How do I report a bug or technical issue?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            If you encounter a bug or technical problem, please report it to us via <strong>**support@mentora.com** </strong>, and our technical team will work on resolving it.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">22. How do I contact customer support?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            You can contact our customer support team by visiting the "Contact Us" page or by sending an email to <strong>**support@mentora.com** </strong>.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">23. Where can I find platform updates and news?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            In the future, we will be creating a **Blog** section to keep you informed about new updates, features, and other important news regarding Mentora.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">24. How do I provide feedback about the platform?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            We value your feedback! You can send your thoughts, suggestions, or concerns to <strong>**feedback@mentora.com** </strong>, and we will take them into consideration for future improvements.
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-medium">25. How to create a meeting link?</h3>
          <p className="text-sm md:text-base lg:text-lg">
            To create a meeting link, you can use any external meeting platform such as Google Meet, Zoom, or others. For Google Meet, it is recommended to create a **Google Calendar event** to generate a link that will remain valid for a long time. For all other platforms, ensure the meeting link is accessible for an extended period before sharing it with your mentor or mentee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
