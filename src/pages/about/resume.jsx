import React from 'react';
import moment from 'moment';

import PageLayout from 'layouts/PageLayout';
import { CodeTokenList, FlexList, Flex, Icon, InfoText, MentionList } from 'ui';

import { getGithubSourceLink } from 'routes';
import { pluralize } from 'utils';

import resume from '../../../data/resume.json';

export default function ResumePage() {
  const {
    education,
    email,
    experience,
    github,
    homepage,
    influences,
    interests,
    name,
    projectsUrl,
    skills,
  } = resume;

  const description = (
    <FlexList flexDirection="column">
      <FlexList>
        <Icon as="a" icon="github" href={github} size="s" />
        <Flex as="a" href={`mailto:${email}`}>
          <Icon icon="mail" size="s" />
          {email}
        </Flex>
        <Flex as="a" href={homepage}>
          <Icon icon="link" size="s" />
          {homepage}
        </Flex>
      </FlexList>
      <div>{resume.description}</div>
    </FlexList>
  );

  return (
    <PageLayout
      description={description}
      source={getGithubSourceLink('/resume.json')}
      title={name}
    >
      <FlexList flexDirection="column" fontSize="s" spacing={5}>
        <div>
          <h2>Experience</h2>
          <FlexList flexDirection="column">
            {experience.map(
              ({ company, companyUrl, description, end, start, title }) => {
                const momentEnd = end ? moment(end) : moment();
                const momentStart = moment(start);
                const workDuration = moment.duration(
                  momentEnd.diff(momentStart),
                );
                const workYears = workDuration.years();
                const workMonths = workDuration.months();
                let workDurationYearsMonths = [];
                if (workYears) {
                  workDurationYearsMonths.push(pluralize('yr', workYears));
                }
                if (workMonths) {
                  workDurationYearsMonths.push(pluralize('mth', workMonths));
                }
                return (
                  <div key={`${title}@${company}`}>
                    <h3>{title}</h3>
                    <FlexList as="i" justifyContent="space-between">
                      <a href={companyUrl}>{company}</a>
                      <InfoText>
                        {momentStart.format('MMM YYYY')} -{' '}
                        {end ? momentEnd.format('MMM YYYY') : 'Present'} (
                        {workDurationYearsMonths.join(' ')})
                      </InfoText>
                    </FlexList>
                    <ul>
                      {description.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                );
              },
            )}
          </FlexList>
        </div>
        <div>
          <h2>Projects</h2>
          <a href={projectsUrl}>{projectsUrl}</a>
        </div>
        <div>
          <h2>Education</h2>
          <h3>{education.school}</h3>
          <FlexList as="i" justifyContent="space-between">
            <div>
              {education.degree} in {education.fields.join(' & ')} (
              {education.gpaScore.toFixed(2)}/{education.gpaMaxScore.toFixed(2)}
              )
            </div>
            <InfoText>
              {moment(education.start).format('YYYY')} -{' '}
              {moment(education.end).format('YYYY')}
            </InfoText>
          </FlexList>
        </div>
        <div>
          <h2>Skills</h2>
          <CodeTokenList values={skills} />
        </div>
        <div>
          <h2>Interests</h2>
          <CodeTokenList values={interests} />
        </div>
        <div>
          <h2>Influences</h2>
          <MentionList mentions={influences} />
        </div>
      </FlexList>
    </PageLayout>
  );
}
