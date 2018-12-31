import React, { Component } from "react"
import TimelineItem from "../TimelineItem"

class Education extends Component {
  render() {
    return (
      <ul className="timeline">
        <TimelineItem
          type="work"
          company="Computer Training Institute"
          duration="Oct 2005 - Dec 2005"
          title="Junior Instructor"
        >
          <p>
            I was promoted to Junior Instructor. Additional responsibilities
            included liaising with parents and managing my own class of students
            while maintaining a low failure rate.
          </p>
        </TimelineItem>
        <TimelineItem
          type="certificate"
          company="Computer Training Institute"
          duration="Aug 2005 - Oct 2005"
          title="Certificate"
        >
          <p>
            I received a <span className="tag">VB.NET</span> certificate for
            completing all modules. Passed with distinction.
          </p>
        </TimelineItem>
        <TimelineItem
          type="certificate"
          company="Computer Training Institute"
          duration="Jan 2005 - Oct 2005"
          title="National diploma"
        >
          <p>
            I received my national diploma in
            <strong>Information Systems: Software Development</strong> with
            subjects in <span className="tag">SQL Server 2000</span>,
            <span className="tag">C#</span> and{" "}
            <span className="tag">VB.NET</span>. Passed with distinction.
          </p>
        </TimelineItem>
        <TimelineItem
          type="work"
          company="Computer Training Institute"
          duration="Jan 2005 - Sept 2005"
          title="Assistant Instructor"
        >
          <p>
            I was awarded a bursary to study further while being an Assistant
            Instructor. I was responsible for developing pre-test materials,
            hosting workshops and marking projects and exams.
          </p>
        </TimelineItem>
        <TimelineItem
          type="certificate"
          company="Computer Training Institute"
          duration="Jan 2004 - Nov 2004"
          title="National Diploma"
        >
          <p>
            I received my national diploma for
            <strong>Computer Science: Internet Development</strong> with
            subjects in Standard, Micro and Enterprise{" "}
            <span className="tag">Java</span> and{" "}
            <span className="tag">Perl</span>. Passed with distinction.
          </p>
        </TimelineItem>
        <TimelineItem
          type="work"
          company="Freelancer"
          duration="Between 2002 and 2004"
          title="Freelancer"
        >
          <p>
            I was a freelance web designer for local companies including the
            Springs Advertiser and Elco Steel.
          </p>
        </TimelineItem>
        <TimelineItem
          type="certificate"
          company="Dr Johan Jurgens High School"
          duration="Jan 1999 - Dec 2003"
          title="Matriculated"
        >
          <p>
            Matriculated with university exemption. All subjects on higher
            grade: English, Afrikaans, Computer Science, Mathematics, Science
            and Economics.
          </p>
          <ul>
            <li>Representative of the Student Council (2002-2003)</li>
            <li>Editor of school newspaper (2003)</li>
            <li>Layout editor of school newspaper (2001-2002)</li>
            <li>Photographer for school newspaper (2000)</li>
            <li>Web Master of IT College (2001 - 2002)</li>
            <li>Member of the IT College (2000-2002)</li>
          </ul>
        </TimelineItem>
      </ul>
    )
  }
}

export default Education