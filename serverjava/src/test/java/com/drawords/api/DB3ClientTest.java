package com.drawords.api;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.drawords.Service.DB3Client;
import com.drawords.bean.Word;

import network.db3.client.AddDocResult;
import network.db3.client.Client;

public class DB3ClientTest {

    @InjectMocks
    private DB3Client db3Client = DB3Client.getInstance();

    @Mock
    private Client mockClient;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSaveToDB3Success() throws Exception {
        // Arrange
        Word testWord = new Word(); // you might need to populate it if Word has mandatory fields
        AddDocResult expectedResult = new AddDocResult(null, 0); // you can mock this too if needed

        when(mockClient.addDoc(anyString(), anyString(), anyString())).thenReturn(expectedResult);

        // Act
        AddDocResult result = db3Client.saveToDB3(testWord);

        // Assert
        assertEquals(expectedResult, result);
        verify(mockClient, times(1)).addDoc(anyString(), anyString(), anyString());
    }

    @Test
    public void testSaveToDB3Exception() throws Exception {
        // Arrange
        Word testWord = new Word();

        // when(mockClient.addDoc(anyString(), anyString(), anyString())).thenThrow(new
        // Exception("DB Error"));

        // Act
        AddDocResult result = db3Client.saveToDB3(testWord);

        // Assert
        assertNull(result);
        verify(mockClient, times(1)).addDoc(anyString(), anyString(), anyString());
    }
}
