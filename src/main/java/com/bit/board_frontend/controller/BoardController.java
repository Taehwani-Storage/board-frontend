package com.bit.board_frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/board/")
public class BoardController {
    @GetMapping("showAll")
    public String moveToFirst() {
        return "redirect:/board/showAll/1";
    }

    @GetMapping("showAll/{page}")
    public String showAll(@PathVariable String page) {

        return "/board/showAll";
    }
}
