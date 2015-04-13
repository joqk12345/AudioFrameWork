/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.constant;

import java.util.Map;
import java.util.TreeMap;

/**
 * @author lenovo
 */
public class AudioKeeperConstant {

    public static final Map<String, Integer> AudioKeeperCountType = new TreeMap<>();

    static {
        AudioKeeperCountType.put("按天统计", 1);
        AudioKeeperCountType.put("按月统计", 2);
        AudioKeeperCountType.put("按时段统计", 3);
    }

    public static final Map<Integer, String> Emotion = new TreeMap<>();

    static {
        Emotion.put(0, " 情绪正常");
        Emotion.put(1, "情绪异常");
        //1有情绪
    }

    public static final Map<String, String> EmotionString = new TreeMap<>();

    static {
        EmotionString.put("情绪正常", "0");
        EmotionString.put("情绪异常", "1");
        EmotionString.put("所有情绪", "2");
        //1有情绪
    }

}
