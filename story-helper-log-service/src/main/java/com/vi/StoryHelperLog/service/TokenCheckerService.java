package com.vi.StoryHelperLog.service;

public interface TokenCheckerService {
    boolean checkToken(String token, String username);
}
