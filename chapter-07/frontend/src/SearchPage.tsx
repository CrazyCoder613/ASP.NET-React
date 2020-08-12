import React from 'react';
import { Page } from './Page';

import { useSearchParams } from 'react-router-dom';
import { QuestionList } from './QuestionList';
import { searchQuestions } from './QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  AppState,
  SearchingQuestionsAction,
  SearchedQuestionsAction,
} from './Store';

export const SearchPage = () => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: AppState) => state.questions.searched,
  );

  const [searchParams] = useSearchParams();

  const search =
    searchParams.get('criteria') || '';

  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      const searchingQuestionsAction: SearchingQuestionsAction = {
        type: 'SearchingQuestions',
      };
      dispatch(searchingQuestionsAction);
      const foundResults = await searchQuestions(
        criteria,
      );
      const searchedQuestionsAction: SearchedQuestionsAction = {
        type: 'SearchedQuestions',
        questions: foundResults,
      };
      dispatch(searchedQuestionsAction);
    };
    doSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
