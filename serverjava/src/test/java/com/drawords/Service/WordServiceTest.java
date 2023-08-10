package com.drawords.Service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.drawords.Service.translate.GPTClient;
import com.drawords.bean.WordContext;
import com.drawords.bean.WordQuery;
import com.drawords.bean.WordTranslation;
import com.drawords.bean.WordView;
import com.drawords.bean.gpt.GTPWordExlpain;

import org.mockito.MockedStatic;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import java.util.Arrays; // <- Add this import
import java.util.List;

@SpringBootTest
public class WordServiceTest {
    @Autowired
    private WordService wordService;

    @Test
    void testQueryWordList() {

    }

    @Test
    void testSaveWord() {

    }

    @Test
    public void testCheckWord() {
        // Create mocks
        WordQuery wordQuery = mock(WordQuery.class);
        WordContext wordContext = mock(WordContext.class);
        GTPWordExlpain gtpWordExlpain = mock(GTPWordExlpain.class);
        GPTClient gptClient = mock(GPTClient.class);

        // Setup mock behavior
        when(wordQuery.getContext()).thenReturn(wordContext);
        when(wordQuery.getWord()).thenReturn("example");
        when(wordContext.getSentence()).thenReturn("This is a sentence.");
        when(gptClient.askGPTAsDictionary(anyString(), anyString(), eq(false), eq("CN"))).thenReturn(gtpWordExlpain);
        when(gtpWordExlpain.getWord()).thenReturn("example");
        when(gtpWordExlpain.getPhonetic()).thenReturn("ɪɡˈzæmpəl");
        // Change this line
        when(gtpWordExlpain.getSimilarWords()).thenReturn(Arrays.asList("sample"));

        // Create instance of WordTranslation class
        WordTranslation wordTranslation = new WordTranslation();

        // Call the method under test
        // wordTranslation.checkWord(wordQuery);

        // Verify the expected interactions
        verify(wordQuery, times(1)).getContext();
        verify(wordQuery, times(1)).getWord();
        verify(wordContext, times(1)).getSentence();
        verify(gptClient, times(1)).askGPTAsDictionary(eq("example"), eq("This is a sentence."), eq(false), eq("CN"));
        verify(gtpWordExlpain, times(1)).getWord();
        verify(gtpWordExlpain, times(1)).getPhonetic();
        verify(gtpWordExlpain, times(1)).getSimilarWords();
        verifyNoMoreInteractions(wordQuery, wordContext, gptClient, gtpWordExlpain);
    }
}
